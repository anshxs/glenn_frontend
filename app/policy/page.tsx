import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <strong key={`${part}-${index}`} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-[0.92em] text-neutral-300"
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
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20 flex-1">
        <article className="space-y-6">
          {blocks.map((block, index) => {
            if (block.type === "hr") {
              return <hr key={`hr-${index}`} className="border-neutral-900" />;
            }

            if (block.type === "heading") {
              if (block.level === 1) {
                return (
                  <h1
                    key={`h1-${index}`}
                    style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                    className="text-3xl font-black uppercase tracking-tight sm:text-4xl text-white"
                  >
                    {block.text}
                  </h1>
                );
              }

              if (block.level === 2) {
                return (
                  <h2
                    key={`h2-${index}`}
                    style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                    className="pt-6 text-xl font-bold uppercase tracking-tight sm:text-2xl text-white"
                  >
                    {block.text}
                  </h2>
                );
              }

              return (
                <h3
                  key={`h3-${index}`}
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                  className="text-base font-bold sm:text-lg text-white"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              const ListTag = block.ordered ? "ol" : "ul";

              return (
                <ListTag
                  key={`list-${index}`}
                  className={`space-y-2 pl-5 text-sm leading-7 text-neutral-400 sm:text-[15px] ${
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
                className="text-sm leading-7 text-neutral-300 sm:text-[15px] font-normal"
              >
                {parseInline(block.text)}
              </p>
            );
          })}
        </article>
      </div>

      <Footer />
    </main>
  );
}
