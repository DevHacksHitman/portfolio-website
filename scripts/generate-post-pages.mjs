/**
 * Post-build: give every post its own static HTML head.
 *
 * The site is client-rendered, so a crawler fetching /posts/<slug> would see the
 * base document — meaning a shared post link previewed with the site's card
 * instead of the post's own title. This script reads the built index.html and
 * the markdown posts, then writes /posts/<slug>/index.html for each one with
 * the title, description and Open Graph tags injected. The SPA still boots and
 * renders the post; crawlers and link previews now see the right metadata.
 *
 * No dependencies. Runs as part of `npm run build`.
 */

import { mkdirSync, readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DIST = join(ROOT, "dist");
const POSTS_DIR = join(ROOT, "src", "posts");
const SITE = (process.env.SITE_URL || "https://devkik.vercel.app").replace(/\/$/, "");
const AUTHOR = "AbdulAzeez Animashaun";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function frontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index > 0) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (key) meta[key] = value;
    }
  }
  return meta;
}

/** Replace the content of a meta/link tag matched by an attribute fragment. */
function setTag(html, needle, attribute, value) {
  const pattern = new RegExp(`(<(?:meta|link)[^>]*${needle}[^>]*${attribute}=")[^"]*(")`, "i");
  if (!pattern.test(html)) {
    console.warn(`  ! tag not found for ${needle} ${attribute}`);
    return html;
  }
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

function buildHead(html, { title, description, url }) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = setTag(out, 'name="description"', "content", description);
  out = setTag(out, 'property="og:title"', "content", title);
  out = setTag(out, 'property="og:description"', "content", description);
  out = setTag(out, 'property="og:url"', "content", url);
  out = setTag(out, 'name="twitter:title"', "content", title);
  out = setTag(out, 'name="twitter:description"', "content", description);
  out = setTag(out, 'rel="canonical"', "href", url);
  return out;
}

function withNoScript(html, { title, body, repo }) {
  const block = `
    <noscript>
      <article style="max-width: 640px; margin: 12vh auto; padding: 0 24px; color: #E4E4E6; font-family: system-ui, sans-serif;">
        <h1 style="font-size: 1.6rem;">${escapeHtml(title)}</h1>
        <div style="color: #AFB0B6; line-height: 1.7; white-space: pre-line;">${escapeHtml(body.slice(0, 600))}</div>
        <p><a style="color: #3fb950;" href="${escapeHtml(repo || "/posts")}">${escapeHtml(repo || "All posts")}</a></p>
        <p><a style="color: #3fb950;" href="/posts">All posts</a> · <a style="color: #3fb950;" href="/">Home</a></p>
      </article>
    </noscript>`;
  return html.replace("</body>", `${block}\n  </body>`);
}

function main() {
  const indexFile = join(DIST, "index.html");
  if (!existsSync(indexFile)) {
    console.error("generate-post-pages: dist/index.html missing — run vite build first");
    process.exit(1);
  }
  if (!existsSync(POSTS_DIR)) {
    console.log("generate-post-pages: no posts to generate");
    return;
  }

  const base = readFileSync(indexFile, "utf8");
  const files = readdirSync(POSTS_DIR).filter((name) => name.endsWith(".md"));
  let count = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = readFileSync(join(POSTS_DIR, file), "utf8");
    const meta = frontMatter(raw);
    const title = `${meta.title || slug} — ${AUTHOR}`;
    const description = meta.summary || `Notes from ${AUTHOR} on building software in public.`;
    const url = `${SITE}/posts/${slug}`;

    let html = buildHead(base, { title, description, url });
    html = withNoScript(html, { title: meta.title || slug, body: raw.split(/\r?\n---\r?\n/).pop(), repo: meta.repo });

    const target = join(DIST, "posts", slug);
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "index.html"), html, "utf8");
    count += 1;
  }

  // The archive itself
  const archive = buildHead(base, {
    title: `Posts — ${AUTHOR}`,
    description: "Short pieces about decisions inside my public repositories.",
    url: `${SITE}/posts`,
  });
  mkdirSync(join(DIST, "posts"), { recursive: true });
  writeFileSync(join(DIST, "posts", "index.html"), archive, "utf8");

  console.log(`generate-post-pages: wrote ${count} post page(s) + the archive`);
}

main();
