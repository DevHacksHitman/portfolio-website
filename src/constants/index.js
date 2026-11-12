export const identity = {
  name: "AbdulAzeez Animashaun",
  fullName: "AbdulAzeez Arowolo Animashaun",
  role: "Software Engineer",
  location: "Ibadan, Nigeria",
  timezone: "WAT (UTC+1)",
  email: "devhacksassassin@gmail.com",
  phone: "+234 814 803 1558",
  github: "https://github.com/DevHacksHitman",
  linkedin: "https://www.linkedin.com/in/abdulazeez-animashaun-3523693b0/",
  telegram: "https://t.me/kriev_mev",
};

export const navLinks = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Work", href: "#work" },
  { id: 4, name: "Contact", href: "#contact" },
];

// Real, public repositories. The card art is the real terminal output of each
// project's own command, rendered as live HTML rather than a screenshot: these
// projects are CLIs and servers, so a transcript is the honest picture of them.
// A project with a real browser UI can supply `art.image` instead.
export const myProjects = [
  {
    title: "Hundjäger — media stream inspector & download server",
    desc: "A local-first media inspector and downloader: one 829-line Python file, standard library only, wrapping yt-dlp behind a hardened web UI. No frameworks, no packages, no build step.",
    subdesc:
      "The interesting part is the threat model: a loopback-only Host allowlist that never auto-trusts the bind address, atomic cancel semantics under a single mutex, a bounded task registry, and a mocked-subprocess test suite that proves the cancel race cannot be lost.",
    href: "https://github.com/DevHacksHitman/hundjager",
    art: {
      kind: "image",
      src: "/assets/projects/hundjager.png",
      label: "hundjager — media hub",
      alt: "The Hundjäger media hub: a URL inspector for any supported video link, an active yt-dlp engine badge, and the live download progress panel.",
    },
    tags: [
      { id: 1, name: "Python (stdlib)" },
      { id: 2, name: "HTTP" },
      { id: 3, name: "Docker" },
      { id: 4, name: "CI" },
    ],
  },
  {
    title: "Solana Liquidity MCP — market data for AI agents",
    desc: "A Model Context Protocol server over stdio that exposes a Solana market-data store to AI agents as five read-only tools and a schema resource. Zero dependencies, no SDK: the JSON-RPC framing is implemented directly.",
    subdesc:
      "Read-only by construction: the SQLite backend is opened with a read-only URI and the connection is closed before serving begins, so no database handle exists while an agent is connected. 971 lines, three modules, 59 tests with zero network calls.",
    href: "https://github.com/DevHacksHitman/solana-liquidity-mcp",
    art: {
      kind: "terminal",
      label: "solana-liquidity-mcp — smoke client",
      status: "all checks passed",
      repo: "github.com/DevHacksHitman/solana-liquidity-mcp",
      lines: [
        "$ python3 scripts/mcp_smoke_client.py",
        "MCP stdio smoke test",
        "  [PASS] initialize negotiates a protocol version — 2025-06-18",
        "  [PASS] tools/list returns 5 tools — got 5",
        "  [PASS] liquidity_snapshot returns text — 84 events, 4 mints",
        "  [PASS] pipeline_status reports dedupe integrity",
        "  [PASS] resources/read returns the schema",
        "  [PASS] unknown tool is a JSON-RPC error",
        "",
        "ALL CHECKS PASSED",
      ],
    },
    tags: [
      { id: 1, name: "Python (stdlib)" },
      { id: 2, name: "MCP" },
      { id: 3, name: "AI agents" },
      { id: 4, name: "JSON-RPC" },
    ],
  },
  {
    title: "Solana Liquidity Stream Tracker — market-data monitor",
    desc: "An async WebSocket pipeline that records live on-chain market events: reconnecting listener with jittered exponential backoff, dedupe by transaction signature, SQLite store, and a React ticker that streams the same data in the browser.",
    subdesc:
      "Honest scope: this is a market-data monitor, not a trading system. The free-tier limits are documented at three layers, and the listener stores what the RPC actually returned rather than inferring values it never saw.",
    href: "https://github.com/DevHacksHitman/solana-liquidity-stream-tracker",
    art: {
      kind: "image",
      src: "/assets/projects/tracker-ticker.png",
      label: "solana-liquidity-stream-tracker — web interface",
      alt: "The tracker's web interface: the project title, its description panel and the status badges for the pipeline, the schema and the frontend.",
    },
    tags: [
      { id: 1, name: "Python (asyncio)" },
      { id: 2, name: "SQLite" },
      { id: 3, name: "React" },
      { id: 4, name: "WebSocket" },
    ],
  },
  {
    title: "Halo — non-custodial mutual aid on Base",
    desc: "An autonomous mutual aid fund: donors grant scoped MetaMask permissions, an AI verifier checks receipts, and separate agent lanes keep verifier and treasurer authority apart. Payout state comes from the relayer, never from a claim in the UI.",
    subdesc:
      "Built for the MetaMask Smart Accounts Kit x 1Shot API x Venice AI Dev Cook Off. The boundary is written down: paid state is only rendered when the relayer confirms it, and mainnet wording stays gated until the send is terminal.",
    href: "https://github.com/DevHacksHitman/HALO",
    art: {
      kind: "image",
      src: "/assets/projects/halo.png",
      label: "halo — build dashboard",
      alt: "The Halo build dashboard: the autonomous mutual aid pitch, the demo lane with MetaMask, Venice, x402, A2A and 1Shot status, and a local proof log.",
    },
    tags: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Solidity / Foundry" },
      { id: 3, name: "Agent A2A" },
      { id: 4, name: "Base Sepolia" },
    ],
  },
  {
    title: "history-scan — secrets scanner for git history",
    desc: "A zero-dependency scanner that walks a repository's whole commit history, the staged change or the working tree, and finds credential shapes, personal data and high-entropy strings — redacting every match it reports.",
    subdesc:
      "The redaction is the point: a scanner that prints the secret it found has just leaked it into your CI log. Findings show a prefix and a length, the value never leaves the machine, and SARIF output drops straight into a code-scanning pipeline.",
    href: "https://github.com/DevHacksHitman/history-scan",
    art: {
      kind: "terminal",
      label: "history-scan — self-scan",
      status: "exit 0",
      repo: "github.com/DevHacksHitman/history-scan",
      lines: [
        "$ python3 history_scan.py --repo . --worktree",
        "PASS — no findings in working tree.",
        "",
        "$ python3 history_scan.py --repo .",
        "PASS — no findings in git history.",
      ],
    },
    tags: [
      { id: 1, name: "Python (stdlib)" },
      { id: 2, name: "SARIF" },
      { id: 3, name: "CI" },
      { id: 4, name: "Zero deps" },
    ],
  },
  {
    title: "records-quality-audit — records validator with an audit trail",
    desc: "A zero-dependency validator for CSV, TSV and Excel files that checks duplicates, missing required fields, malformed dates, out-of-range numbers and unexpected codes — then appends one JSON line recording exactly what was checked.",
    subdesc:
      "The sha256 in that line ties a result to one exact file, not to a filename, so the log is evidence rather than a note. Excel is read straight out of the zip, so there is no pandas and no install step.",
    href: "https://github.com/DevHacksHitman/records-quality-audit",
    art: {
      kind: "terminal",
      label: "records-quality-audit — cli",
      status: "exit 0",
      repo: "github.com/DevHacksHitman/records-quality-audit",
      lines: [
        "$ python3 records_audit.py records.csv --rules rules.json",
        "FINDINGS — 8 in records.csv (2 record(s), 8 column(s))",
        "",
        "     row 3  [format] date_of_birth does not match date",
        "            value: not-a-date",
        "     row 3  [allowed] gender is not one of: Male, Female",
        "            value: Unknown",
        "     row 3  [range] age is outside 0–120",
        "            value: 200",
        "     row 3  [unique] duplicate of row 2",
        "            value: 1001",
        "    column  [pii] column looks like personal data (2 row(s))",
        "",
        "Summary: allowed=1, format=1, pii=1, range=1, unique=1",
      ],
    },
    tags: [
      { id: 1, name: "Python (stdlib)" },
      { id: 2, name: "CSV / XLSX" },
      { id: 3, name: "SHA-256" },
      { id: 4, name: "Audit trail" },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.045 : isMobile ? 0.052 : 0.058,
    deskPosition: isMobile ? [0.5, -6.2, 0] : [0.25, -7.2, 0],
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
        ? [5, 4, 0]
        : isTablet
          ? [5, 4, 0]
          : [12, 3, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
        ? [-10, 10, 0]
        : isTablet
          ? [-12, 10, 0]
          : [-24, 10, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: "Open-Source Software Engineering",
    pos: "Freelance",
    duration: "2023 – present",
    title:
      "Six repositories in the open: a loopback-only media inspector and downloader, a market-data monitor for Solana, an MCP server that gives AI agents read-only access to that store, a secrets scanner for git history, a records auditor that leaves an append-only trail, and Halo, a non-custodial mutual aid fund on Base Sepolia. Each one is designed, built, tested and documented in public — threat models, race-free cancellation, CI matrices, and a pre-push gate that blocks sensitive material before it reaches history.",
  },
  {
    id: 2,
    name: "Freelance Web3 development",
    pos: "Independent contractor",
    duration: "2017 – 2023",
    title:
      "Staking contracts and dApp interfaces on EVM chains (Binance Smart Chain, Ethereum), Web3 project sites, and technical writing for notable privacy-focused Web3 protocols. Also ran community channels for several of these projects.",
  },
  {
    id: 3,
    name: "Biology, Mathematics & Chemistry tutor",
    pos: "Private coaching & licensed coaching centres",
    duration: "2013 – 2017",
    title:
      "Private lessons and group tutorials for A'Level students. The teaching habit never left, it is why every repository I ship has a README that explains the why.",
  },
  {
    id: 4,
    name: "University of Ilorin",
    pos: "B.Sc.Ed (Biology)",
    duration: "2009 – 2012",
    title:
      "Biology education degree, followed by NYSC (2012/2013). The science training and the classroom years are what I bring to systems work: state the claim, show the evidence, explain the method.",
  },
];
