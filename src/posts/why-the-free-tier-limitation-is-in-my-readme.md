---
title: Why I put a free-tier limitation in my own README
date: 2026-11-13
summary: The ticker can look empty and be working perfectly. Documenting that at three layers is cheaper than one support conversation.
repo: https://github.com/DevHacksHitman/solana-liquidity-stream-tracker
---

The tracker follows a free public event stream. Per-token trade streams on that provider are a paid feature. So there is a state where the software is behaving correctly and the screen still looks unimpressive: a quiet market means an empty ticker.

The tempting move is to say nothing and let the README promise a live feed. I documented the limitation in three places instead.

## The three layers

**In the widget, where the symptom appears.** If a token address is configured without a funded key, the ticker renders one line: per-token streams need a funded key, so it is following the free creation stream instead. The user sees the reason at the moment they would otherwise assume a bug.

**In the README, in plain words.** An empty feed in a quiet market is the provider's tier, not a defect in this code. It also says what the free path *is* for: program-level log subscription, which is the server listener's job.

**In the example environment file.** The one variable that switches to the paid path carries the caveat inline, commented out, so the paid route is discoverable without being the default.

## Why bother

Two reasons. First, a README that overstates is a README that gets distrusted the moment it is tested — and someone testing it is exactly the person I want to keep. Second, it is the same discipline as a threat model: state the boundary, then let the code be judged inside it.

There is a cost, and it is real: the honest version is less exciting to read. I would rather the first impression be accurate. Every number in that README — 18 tests, the audit result, the bundle size — comes from a command a reader can repeat, and the limitation line sits in the same document as the features, not buried in a footnote.
