---
title: What dedupe by transaction signature actually prevents
date: 2026-11-13
summary: A market-data listener reconnects, backfills and retries. Without one uniqueness rule, every one of those events is a double count.
repo: https://github.com/DevHacksHitman/solana-liquidity-stream-tracker
---

The tracker subscribes to on-chain trade events and writes them to SQLite. The least glamorous line in it is the one that keeps the numbers honest: a `UNIQUE` constraint on the transaction signature, with `INSERT OR IGNORE` on the write path.

## What it prevents

A WebSocket listener is not a single clean stream. It drops. It reconnects with jittered exponential backoff. Sometimes it replays the tail of what it already saw, and a backfill after a reconnect can overlap with live events. Without a uniqueness rule at the storage layer, each of those is a duplicate row — and the duplicates are not random. They cluster exactly where the connection was unhealthy, which is the worst possible place for an analytics error, because a bad minute looks like a busy minute.

Dedupe by signature fixes that because the signature is the transaction's identity. The same real-world event cannot arrive twice as two rows.

## What it does not do

It does not deduplicate *trades* within one transaction. If a single transaction contains several swaps, they share a signature and only one row survives. That is a deliberate trade — signature-level dedupe was the honest scope for a market-data monitor — but it is a limitation, and the README says so rather than implying per-trade completeness.

It also cannot repair what the logs never carried. The listener stores what the RPC actually returned: signature, slot, side and raw logs. The `mint`, `trader`, `token_amount` and `sol_amount` columns exist but are currently left `NULL`, because the metadata step that would fill them is not built. Those columns are a promise for later, not a claim about today.

18 tests cover this, including the offline paths, and the storage rule is enforced by the database schema rather than by application code that a refactor could quietly drop.
