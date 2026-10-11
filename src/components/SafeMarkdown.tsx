import React from 'react';

interface SafeMarkdownProps {
  content: string;
}

/**
 * Safely renders inline Markdown formatting (**bold**, *italic*, `code`) into React nodes
 * without using dangerouslySetInnerHTML or allowing arbitrary untrusted HTML.
 */
function renderInlineTokens(text: string, keyPrefix: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    const key = `${keyPrefix}-inline-${idx}`;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-[#101828] border border-[#1E293B] font-mono-tabular text-[11px] text-[#C8F75A]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={key} className="italic text-[#E2E8F0]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

type BlockNode =
  | { type: 'heading'; level: number; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'paragraph'; lines: string[] };

export function SafeMarkdown({ content }: SafeMarkdownProps) {
  const normalized = (content || '').replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  const lines = normalized.split('\n');
  const blocks: BlockNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Heading (#, ##, ###)
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i += 1;
      continue;
    }

    // Unordered list (-, *, •)
    if (/^([-*•])\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length) {
        const lineTrim = lines[i].trim();
        const ulMatch = lineTrim.match(/^([-*•])\s+(.+)$/);
        if (!ulMatch) break;
        items.push(ulMatch[2].trim());
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list (1., 2.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length) {
        const lineTrim = lines[i].trim();
        const olMatch = lineTrim.match(/^\d+\.\s+(.+)$/);
        if (!olMatch) break;
        items.push(olMatch[1].trim());
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Regular paragraph (consume consecutive non-list, non-heading, non-empty lines)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const lineTrim = lines[i].trim();
      if (
        !lineTrim ||
        /^(#{1,3})\s+/.test(lineTrim) ||
        /^([-*•])\s+/.test(lineTrim) ||
        /^\d+\.\s+/.test(lineTrim)
      ) {
        break;
      }
      paraLines.push(lineTrim);
      i += 1;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', lines: paraLines });
    }
  }

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
      {blocks.map((block, bIdx) => {
        const blockKey = `md-block-${bIdx}`;

        if (block.type === 'heading') {
          return (
            <div key={blockKey} className="font-semibold text-white pt-1">
              {renderInlineTokens(block.text, blockKey)}
            </div>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={blockKey} className="space-y-1.5 pl-4 list-disc marker:text-[#C8F75A]">
              {block.items.map((item, itemIdx) => (
                <li key={`${blockKey}-li-${itemIdx}`} className="text-[#F8FAFC] leading-relaxed">
                  {renderInlineTokens(item, `${blockKey}-li-${itemIdx}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={blockKey} className="space-y-1.5 pl-4 list-decimal marker:text-[#C8F75A]">
              {block.items.map((item, itemIdx) => (
                <li key={`${blockKey}-oli-${itemIdx}`} className="text-[#F8FAFC] leading-relaxed">
                  {renderInlineTokens(item, `${blockKey}-oli-${itemIdx}`)}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={blockKey} className="text-[#F8FAFC] leading-relaxed">
            {block.lines.map((line, lIdx) => (
              <React.Fragment key={`${blockKey}-line-${lIdx}`}>
                {lIdx > 0 && <br />}
                {renderInlineTokens(line, `${blockKey}-line-${lIdx}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
