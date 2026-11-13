---
title: Why my scanner redacts what it finds
date: 2026-11-13
summary: A secrets scanner that prints the secret it found has just leaked it into a CI log. Findings have to be actionable without being exploitable.
repo: https://github.com/DevHacksHitman/git-scan
---

GitScan walks a repository's history, the staged change or the working tree, and reports credential shapes, personal data and high-entropy strings. It is one Python file with no dependencies, because a security tool that installs a dependency tree adds supply-chain risk in the exact place you are trying to reduce it.

The design decision I care most about is what it prints.

## The problem with the obvious behaviour

Most first attempts print the match. It is the most useful-looking output — here is the offending string — and it is a mistake. Scan output flows into CI logs, terminal scrollback, ticket attachments and chat. A report that contains the live credential has just moved it somewhere new, with none of the protections the original had, and often somewhere with a wider audience.

So findings show a **four-character prefix and a length**: enough to find the line, not enough to use it. The value never appears in the text output, the JSON output or the SARIF output. Length matters more than it sounds: it tells you whether this is the key currently in use or an older one that can be checked off.

## Making it a tool people keep

Two details decide whether a scanner survives contact with a team.

**It must not flag its own source.** The pattern table is built so this file cannot match its own rules, and two tests scan this repository with this tool and assert zero findings. A scanner that cries wolf on itself gets disabled within a week.

**It must fit an existing pipeline.** Exit codes are 0, 1 or 2; output can be SARIF, so it lands in a code-scanning dashboard instead of a bespoke report renderer; and `--fail-on` separates signal from noise, so a build can gate on credentials without failing because an email address appears in a changelog.

The honest limit: this is pattern matching, not data-flow analysis. A key assembled at runtime or split across lines is not detected, and the entropy heuristic guesses by design. It is a demonstrator of the technique, and the README says to pair it with a mature tool rather than replace one.
