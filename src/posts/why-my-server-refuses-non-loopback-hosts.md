---
title: Why my server refuses any host that is not loopback
date: 2026-11-13
summary: A local service is still a service. Here is the threat model behind the allowlist in hundjager, and why the bind address is never trusted on its own.
repo: https://github.com/DevHacksHitman/hundjager
---

Hundjäger is a media inspector and downloader that runs as a local web UI. It is one 829-line Python file with no third-party packages, and the part I am most deliberate about is not the downloader — it is who is allowed to talk to it.

Every request passes one check before anything else happens: the `Host` header must be `127.0.0.1` or `localhost` with the correct port, and if an `Origin` header is present it must be a local origin on that same port. Anything else gets a `403`.

## The two attacks this prevents

**DNS rebinding.** A page on an attacker's domain can point that domain's DNS at `127.0.0.1`. Your browser then happily sends requests to my service — with `Host: attacker.example`, because the browser is talking to the hostname it was given. Network position alone says "local", so a naive check would allow it. Matching the `Host` header against a fixed allowlist means the request is rejected even though it arrived on the loopback interface.

**Cross-site form posts.** A plain HTML form on another site can POST to `http://127.0.0.1:PORT/...` without reading a response. The `Origin` header gives it away, and the same allowlist rejects it.

## The decision that matters most

**The bind address is never added to the allowlist automatically.** If you run the server with `--host 0.0.0.0`, that does not silently widen who may talk to it: exposing it beyond loopback requires an explicit `--allow-hosts` opt-in and prints a startup warning. One function is the single decision point, and a test pins its behaviour, so the "convenient" change that quietly trusts the bind host cannot land by accident.

Everything above is covered by tests that fake the HTTP layer, and the README states the limits plainly: this is a local tool, and running it on a network without adding authentication is not something the allowlist is pretending to solve.
