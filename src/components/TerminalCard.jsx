/**
 * Terminal transcript card.
 *
 * Live HTML rather than a screenshot: it reflows, stays crisp at any density,
 * remains readable to assistive technology, and needs no binary assets. The
 * transcripts are the real output of each project's own test/demo command.
 */

const toneFor = (line) => {
  const text = line.trim();
  if (!text) return "blank";
  if (text.startsWith("$")) return "prompt";
  if (/^OK\b/.test(text) || /\bok$/.test(text) || text.includes("[PASS]")) return "ok";
  if (/FAIL|Error|error:/.test(text)) return "bad";
  if (/^Ran \d+ test/.test(text)) return "muted";
  if (/^[-=]{3,}$/.test(text)) return "dim";
  return "body";
};

const TONE_CLASS = {
  prompt: "text-white-800",
  ok: "text-[#3fb950]",
  bad: "text-[#ff6b6b]",
  muted: "text-white-600/80",
  dim: "text-white-600/35",
  body: "text-white-700",
  blank: "",
};

const TerminalCard = ({ label, status, repo, lines = [] }) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-black/60">
    <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 truncate text-[10px] uppercase tracking-[0.2em] text-white-600/70">
        {label}
      </span>
    </div>

    <div className="flex-1 overflow-hidden p-4 font-mono text-[11.5px] leading-[1.55]">
      {lines.map((line, index) => {
        const tone = toneFor(line);
        const isPrompt = tone === "prompt";
        return (
          <p key={index} className={`${TONE_CLASS[tone]} break-words whitespace-pre-wrap`}>
            {isPrompt ? (
              <>
                <span className="text-[#3fb950]">$</span>
                {line.replace(/^\$\s*/, " ")}
              </>
            ) : (
              line
            )}
          </p>
        );
      })}
    </div>

    <div className="flex items-center justify-between gap-3 border-t border-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-white-600/70">
      <span className="flex shrink-0 items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
        {status}
      </span>
      <span className="truncate">{repo}</span>
    </div>
  </div>
);

export default TerminalCard;
