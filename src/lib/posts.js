/**
 * Post loading. Posts are markdown files with a small front-matter block, so a
 * new post is a new file and nothing else:
 *
 *   ---
 *   title: Why my server refuses non-loopback hosts
 *   date: 2026-11-13
 *   summary: One line for the list page.
 *   repo: https://github.com/DevHacksHitman/hundjager
 *   ---
 *
 * Vite inlines them at build time, so there is no fetch and no parser bundle.
 */

const modules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default", eager: true });

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const index = line.indexOf(":");
    if (index > 0) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
      if (key) meta[key] = value;
    }
  });
  return { meta, body: match[2] };
}

function readingMinutes(body) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parseFrontMatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      summary: meta.summary || "",
      repo: meta.repo || "",
      body,
      minutes: readingMinutes(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug) => posts.find((post) => post.slug === slug);

export function formatDate(value) {
  if (!value) return "";
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
