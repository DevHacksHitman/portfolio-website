import { Fragment } from "react";

/**
 * A small markdown subset renderer: headings, paragraphs, lists, fenced code,
 * blockquotes, rules, plus inline code, bold and links. Enough for technical
 * posts, and it keeps the markdown readable in the repository. Anything more
 * exotic should be a deliberate decision, not an accidental dependency.
 */

function inline(text, keyPrefix) {
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const external = /^https?:/.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = null;
  let code = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({
        type: "p",
        text: paragraph.join(" "),
      });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  lines.forEach((line) => {
    if (code) {
      if (line.trim().startsWith("```")) {
        blocks.push({ type: "code", text: code.lines.join("\n") });
        code = null;
      } else {
        code.lines.push(line);
      }
      return;
    }

    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();
      code = { lines: [] };
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h", level: heading[1].length, text: heading[2] });
      return;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      blocks.push({ type: "hr" });
      return;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: quote[1] });
      return;
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.*)$/);
    if (bullet || ordered) {
      flushParagraph();
      const kind = bullet ? "ul" : "ol";
      if (!list || list.type !== kind) {
        flushList();
        list = { type: kind, items: [] };
      }
      list.items.push((bullet || ordered)[1]);
      return;
    }

    flushList();
    paragraph.push(line.trim());
  });

  if (code) blocks.push({ type: "code", text: code.lines.join("\n") });
  flushParagraph();
  flushList();

  return blocks.map((block, index) => {
    const key = `b-${index}`;
    switch (block.type) {
      case "h": {
        const Tag = block.level === 2 ? "h2" : "h3";
        return <Tag key={key}>{inline(block.text, key)}</Tag>;
      }
      case "ul":
      case "ol": {
        const Tag = block.type;
        return (
          <Tag key={key}>
            {block.items.map((item, itemIndex) => (
              <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>
            ))}
          </Tag>
        );
      }
      case "code":
        return (
          <pre key={key}>
            <code>{block.text}</code>
          </pre>
        );
      case "quote":
        return <blockquote key={key}>{inline(block.text, key)}</blockquote>;
      case "hr":
        return <hr key={key} />;
      default:
        return <p key={key}>{inline(block.text, key)}</p>;
    }
  });
}

export { Fragment };
