import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GLENN",
  description: "Privacy Policy for Glenn.",
  alternates: {
    canonical: "https://policy.glennesports.app",
  },
};

type Block =
  | { type: "hr" }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-black">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded border border-black/10 bg-black/[0.03] px-1.5 py-0.5 font-mono text-[0.92em] text-black"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function parseMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "heading", level: 1, text: line.slice(2).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
      index += 1;
      continue;
    }

    const unorderedMatch = rawLine.match(/^\s*[-*]\s+(.+)/);
    const orderedMatch = rawLine.match(/^\s*\d+\.\s+(.+)/);

    if (unorderedMatch || orderedMatch) {
      const ordered = Boolean(orderedMatch);
      const items: string[] = [];

      while (index < lines.length) {
        const currentLine = lines[index];
        const currentMatch = ordered
          ? currentLine.match(/^\s*\d+\.\s+(.+)/)
          : currentLine.match(/^\s*[-*]\s+(.+)/);

        if (!currentMatch) {
          break;
        }

        items.push(currentMatch[1].trim());
        index += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index].trim();

      if (
        !nextLine ||
        nextLine === "---" ||
        nextLine.startsWith("#") ||
        /^\s*[-*]\s+/.test(lines[index]) ||
        /^\s*\d+\.\s+/.test(lines[index])
      ) {
        break;
      }

      paragraphLines.push(nextLine);
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

async function loadPolicyMarkdown() {
  const filePath = path.join(process.cwd(), "public", "policy.md");
  return fs.readFile(filePath, "utf8");
}

export default async function PolicyPage() {
  const markdown = await loadPolicyMarkdown();
  const blocks = parseMarkdown(markdown);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <article className="space-y-6">
          {blocks.map((block, index) => {
            if (block.type === "hr") {
              return <hr key={`hr-${index}`} className="border-black/10" />;
            }

            if (block.type === "heading") {
              if (block.level === 1) {
                return (
                  <h1 key={`h1-${index}`} className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    {block.text}
                  </h1>
                );
              }

              if (block.level === 2) {
                return (
                  <h2 key={`h2-${index}`} className="pt-4 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                    {block.text}
                  </h2>
                );
              }

              return (
                <h3 key={`h3-${index}`} className="text-base font-semibold sm:text-lg">
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              const ListTag = block.ordered ? "ol" : "ul";

              return (
                <ListTag
                  key={`list-${index}`}
                  className={`space-y-2 pl-5 text-sm leading-7 text-black/72 sm:text-[15px] ${
                    block.ordered ? "list-decimal" : "list-disc"
                  }`}
                >
                  {block.items.map((item, itemIndex) => (
                    <li key={`${item}-${itemIndex}`}>{parseInline(item)}</li>
                  ))}
                </ListTag>
              );
            }

            return (
              <p
                key={`p-${index}`}
                className="text-sm leading-7 text-black/72 sm:text-[15px]"
              >
                {parseInline(block.text)}
              </p>
            );
          })}
        </article>
      </div>
    </main>
  );
}
