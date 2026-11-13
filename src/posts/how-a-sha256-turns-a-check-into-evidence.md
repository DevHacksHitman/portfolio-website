---
title: How a SHA-256 turns a check into evidence
date: 2026-11-13
summary: A validation report says "I checked this file". An append-only log with the file's hash says which bytes were checked, when, and by which rules.
repo: https://github.com/DevHacksHitman/records-quality-auditor
---

Records Quality Auditor checks CSV, TSV and Excel files for duplicates, missing required fields, malformed dates, out-of-range numbers and unexpected codes. The findings are the visible product. The part that makes it useful in a records office is what it leaves behind.

## One line per run

Every run can append a single JSON line to an audit log:

```json
{"tool":"records-audit","version":"0.1.0","checked_at":"2026-11-12T09:44:46Z","file":"records.csv","sha256":"af2f8197…","columns":7,"records":4,"rules":["allowed","format","pii","range","required","unique"],"findings":8,"findings_by_code":{"format":1,"allowed":1,"range":2,"required":1,"unique":1,"pii":2},"result":"FAIL"}
```

The field that carries the weight is the hash. It ties the result to **one exact set of bytes**, not to a filename. `records.csv` is not a fact — files get edited, copied, renamed and regenerated. A SHA-256 of the input at the moment of checking is a fact, and anyone can recompute it from the file they hold and see whether the log line describes it.

Three more properties matter as much as the hash:

- **Append-only.** Entries are added, never rewritten, so the log is a record of what was run rather than a summary that could be tidied up later.
- **Self-describing.** The line names the tool version and the rules that were active. A result without the rules it applied is not reproducible.
- **Privacy-aware.** It stores the file *name*, not the full path, so the log does not leak the shape of someone's filesystem.

## What it does not claim

The hash proves what was checked, not that the data is correct. The PII sweep reports columns that *look like* personal data by pattern; it is a governance signal, not a compliance certificate. And the tool never modifies the input — it produces a report and a log, nothing else.

Together that is the difference between "we ran a check" and "here is what we checked, against which bytes, under which rules, and what it said" — which is the form an audit actually asks for.
