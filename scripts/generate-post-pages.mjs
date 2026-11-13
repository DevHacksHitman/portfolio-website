/**
 * Post-build: static metadata for the writing section.
 *
 * The site is client-rendered, so a crawler fetching /posts/<slug> would see the
 * base document — meaning a shared post link previewed with the site's card
 * instead of the post's own title. This script reads the built index.html and
 * the markdown posts, then writes:
 *
 *   /posts/<slug>/index.html   per-post title, description, OG/Twitter tags,
 *                              JSON-LD BlogPosting, and a <noscript> preview
 *   /posts/index.html          the archive head
 *   /sitemap.xml               home, archive and every post
 *   /posts/feed.xml            RSS 2.0 feed
 *
 * The SPA still boots and renders the post; crawlers, link previews and feed
 * readers now see the right thing. No dependencies. Runs as part of `npm run build`.
 */

import { mkdirSync, readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { workProjects } from "../src/constants/index.js";

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

const escapeXml = escapeHtml;

function frontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index > 0) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (key) meta[key] = value;
    }
  }
  return { meta, body: match[2] };
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

function buildHead(html, { title, description, url, image, imageAlt }) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = setTag(out, 'name="description"', "content", description);
  out = setTag(out, 'property="og:title"', "content", title);
  out = setTag(out, 'property="og:description"', "content", description);
  out = setTag(out, 'property="og:url"', "content", url);
  out = setTag(out, 'name="twitter:title"', "content", title);
  out = setTag(out, 'name="twitter:description"', "content", description);
  out = setTag(out, 'rel="canonical"', "href", url);
  if (image) {
    out = setTag(out, 'property="og:image"', "content", image);
    out = setTag(out, 'name="twitter:image"', "content", image);
    if (imageAlt) out = setTag(out, 'property="og:image:alt"', "content", imageAlt);
  }
  return out;
}

function withJsonLd(html, { title, description, url, date }) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: date || undefined,
    author: { "@type": "Person", name: AUTHOR, url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return html.replace(
    "</head>",
    `  <script type="application/ld+json">${json}</script>\n  </head>`
  );
}

function withNoScript(html, { title, body, repo }) {
  const block = `
    <noscript>
      <article style="max-width: 640px; margin: 12vh auto; padding: 0 24px; color: #E4E4E6; font-family: system-ui, sans-serif;">
        <h1 style="font-size: 1.6rem;">${escapeHtml(title)}</h1>
        <div style="color: #AFB0B6; line-height: 1.7; white-space: pre-line;">${escapeHtml(
          body.replace(/[#*`>]/g, "").slice(0, 600)
        )}</div>
        <p><a style="color: #3fb950;" href="${escapeHtml(repo || "/posts")}">${escapeHtml(
          repo ? "The repository behind this post" : "All posts"
        )}</a></p>
        <p><a style="color: #3fb950;" href="/posts">All posts</a> · <a style="color: #3fb950;" href="/">Home</a></p>
      </article>
    </noscript>`;
  return html.replace("</body>", `${block}\n  </body>`);
}

function writeSitemap(entries, workEntries) {
  const urls = [
    { loc: `${SITE}/`, lastmod: entries[0]?.date },
    { loc: `${SITE}/posts`, lastmod: entries[0]?.date },
    ...entries.map((entry) => ({ loc: `${SITE}/posts/${entry.slug}`, lastmod: entry.date })),
    ...workEntries.map((entry) => ({ loc: `${SITE}/work/${entry.slug}` })),
  ];
  const body = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ""}</url>`
    )
    .join("\n");
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    "utf8"
  );
}

function writeFeed(entries) {
  const items = entries
    .map((entry) => {
      const pubDate = entry.date ? new Date(`${entry.date}T00:00:00Z`).toUTCString() : "";
      return [
        "    <item>",
        `      <title>${escapeXml(entry.title)}</title>`,
        `      <link>${escapeXml(`${SITE}/posts/${entry.slug}`)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(`${SITE}/posts/${entry.slug}`)}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        `      <description>${escapeXml(entry.summary)}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Notes — ${escapeXml(AUTHOR)}</title>
    <link>${SITE}/posts</link>
    <description>Short pieces about decisions inside my public repositories.</description>
    <language>en</language>
    <atom:link href="${SITE}/posts/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  mkdirSync(join(DIST, "posts"), { recursive: true });
  writeFileSync(join(DIST, "posts", "feed.xml"), xml, "utf8");
}

function writeWorkPage(base, project, workEntries) {
  const shortTitle = project.title.split(" — ")[0];
  const url = `${SITE}/work/${project.slug}`;
  const description = project.desc;
  const image = `${SITE}${project.ogImage}`;
  const title = `${shortTitle} — ${AUTHOR}`;

  let html = buildHead(base, {
    title,
    description,
    url,
    image,
    imageAlt: `${shortTitle}: ${project.art?.alt || description}`,
  });

  const payload = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: shortTitle,
    description,
    url,
    codeRepository: project.href,
    keywords: project.tags.map((tag) => tag.name).join(", "),
    author: { "@type": "Person", name: AUTHOR, url: SITE },
  };
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  html = html.replace(
    "</head>",
    `  <script type="application/ld+json">${json}</script>\n  </head>`
  );

  const links = [`<a style="color: #3fb950;" href="${escapeHtml(project.href)}">Repository on GitHub</a>`];
  if (project.demo) {
    links.push(`<a style="color: #3fb950;" href="${escapeHtml(project.demo)}">Live demo</a>`);
  }
  const block = `
    <noscript>
      <article style="max-width: 640px; margin: 12vh auto; padding: 0 24px; color: #E4E4E6; font-family: system-ui, sans-serif;">
        <h1 style="font-size: 1.6rem;">${escapeHtml(shortTitle)}</h1>
        <p style="color: #AFB0B6; line-height: 1.7;">${escapeHtml(description)}</p>
        <p style="color: #AFB0B6; line-height: 1.7;">${escapeHtml(project.subdesc)}</p>
        <p>${links.join(" · ")}</p>
        <p><a style="color: #3fb950;" href="/#work">Selected work</a> · <a style="color: #3fb950;" href="/">Home</a></p>
      </article>
    </noscript>`;
  html = html.replace("</body>", `${block}\n  </body>`);

  const target = join(DIST, "work", project.slug);
  mkdirSync(target, { recursive: true });
  writeFileSync(join(target, "index.html"), html, "utf8");
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
  const entries = [];
  let count = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = readFileSync(join(POSTS_DIR, file), "utf8");
    const { meta, body } = frontMatter(raw);
    const plainTitle = meta.title || slug;
    const title = `${plainTitle} — ${AUTHOR}`;
    const description = meta.summary || `Notes from ${AUTHOR} on building software in public.`;
    const url = `${SITE}/posts/${slug}`;

    let html = buildHead(base, { title, description, url });
    html = withJsonLd(html, { title: plainTitle, description, url, date: meta.date });
    html = withNoScript(html, { title: plainTitle, body, repo: meta.repo });

    const target = join(DIST, "posts", slug);
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "index.html"), html, "utf8");

    entries.push({ slug, title: plainTitle, summary: description, date: meta.date || "", repo: meta.repo || "" });
    count += 1;
  }

  entries.sort((a, b) => (a.date < b.date ? 1 : -1));

  const workEntries = workProjects.map((project) => ({ slug: project.slug }));
  for (const project of workProjects) writeWorkPage(base, project, workEntries);

  const archive = buildHead(base, {
    title: `Posts — ${AUTHOR}`,
    description: "Short pieces about decisions inside my public repositories.",
    url: `${SITE}/posts`,
  });
  mkdirSync(join(DIST, "posts"), { recursive: true });
  writeFileSync(join(DIST, "posts", "index.html"), archive, "utf8");

  writeSitemap(entries, workEntries);
  writeFeed(entries);

  console.log(
    `generate-post-pages: ${count} post page(s) + archive + ${workEntries.length} work page(s) + sitemap.xml + posts/feed.xml`
  );
}

main();