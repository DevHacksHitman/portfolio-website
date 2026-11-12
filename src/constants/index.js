export const identity = {
  name: "AbdulAzeez Animashaun",
  fullName: "AbdulAzeez Arowolo Animashaun",
  role: "Software Engineer",
  location: "Ibadan, Nigeria",
  timezone: "WAT (UTC+1)",
  email: "devhacksassassin@gmail.com",
  phone: "+234 814 803 1558",
  github: "https://github.com/DevHacksHitman",
  linkedin: "https://www.linkedin.com/in/ayomitide-animashaun-3523693b0/",
  telegram: "https://t.me/kriev_mev",
};

export const navLinks = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Work", href: "#work" },
  { id: 4, name: "Contact", href: "#contact" },
];

// Real, public repositories. Project art is deliberately asset-free for now:
// screenshots land in a later pass, once the owner has approved them.
export const myProjects = [
  {
    title: "Hundjäger — media stream inspector & download server",
    desc: "A local-first media inspector and downloader: one 829-line Python file, standard library only, wrapping yt-dlp behind a hardened web UI. No frameworks, no packages, no build step.",
    subdesc:
      "The interesting part is the threat model: a loopback-only Host allowlist that never auto-trusts the bind address, atomic cancel semantics under a single mutex, a bounded task registry, and a mocked-subprocess test suite that proves the cancel race cannot be lost.",
    href: "https://github.com/DevHacksHitman/hundjager",
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
    tags: [
      { id: 1, name: "Python (asyncio)" },
      { id: 2, name: "SQLite" },
      { id: 3, name: "React" },
      { id: 4, name: "WebSocket" },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: "Open-source software engineering",
    pos: "Self-directed",
    duration: "2024 – present",
    title:
      "Hundjäger, the Solana market-data tracker and its MCP server: designed, built, tested and documented in public. Work includes a local-HTTP threat model, race-free cancellation, CI matrices and a pre-push gate that blocks sensitive material before it reaches history.",
  },
  {
    id: 2,
    name: "Freelance Web3 development",
    pos: "Independent contractor",
    duration: "Selected contracts",
    title:
      "Staking contracts and dApp interfaces on EVM chains (Binance Smart Chain, Ethereum), memecoin project sites, and technical writing for privacy-focused protocols including Cipher Protocol. Also ran community channels for several of these projects.",
  },
  {
    id: 3,
    name: "Biology, Mathematics & Chemistry tutor",
    pos: "Private coaching & licensed coaching centres",
    duration: "2012 – 2015",
    title:
      "Private lessons in Enugu and group tutorials for UTME and A-Level candidates in Ibadan. The teaching habit never left: it is why every repository I ship has a README that explains the why.",
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