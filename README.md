# devkik — portfolio site

The personal site of **AbdulAzeez Animashaun** — backend, data and agentic
engineering. A single-page React site with a React Three Fiber hero, a real
project section, and a working contact form.

Live at the Vercel deployment for this repository.

## Stack

| | |
|---|---|
| Framework | React 18 + Vite 5 |
| 3D | React Three Fiber 8 · drei 9 · three 0.168 |
| Motion | GSAP (hero scene), CSS transitions (reveals, hover) |
| Styling | Tailwind CSS 3 |
| Forms | EmailJS |
| Tests | ESLint in CI, plus a visual QA pass recorded in the audit reports |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # ESLint, must be clean
npm run build      # production bundle in dist/
npm run preview    # serve the production build locally
```

Deploy: Vercel detects Vite automatically — build command `npm run build`,
output directory `dist`.

## Design decisions

**The scene never competes with the text.** The 3D desk sits behind a scrim, the
copy sits above both, and the canvas is `pointer-events-none` so it can never
intercept a click. The scrim is a *shape*, not a blanket: below 1280 px it is a
band that fades out above the desk, and at desktop it is a narrow ellipse that
leaves the ring and the atom at full colour. An earlier, larger scrim washed the
whole scene out — the fix was to measure the scene's saturation with the scrim on
and off, not to eyeball it.

**Contrast is measured, not assumed.** The hero text is checked by rendering the
page twice in the same animation frame — once with the copy visible, once
faded — and comparing every ink pixel against the background directly behind
it, at three widths and three animation phases. Current worst case: **10.98:1**
(worst of 3 widths × 3 phases), no ink pixel below its WCAG AA threshold.

**Project art is the real thing.** Projects with a user interface show a real
screenshot; projects that are CLIs and servers show their real terminal output,
rendered as live HTML rather than a bitmap — so it reflows, stays crisp, stays
readable to assistive technology, and needs no binary assets.

**Motion is optional.** Sections fade up on first view through
`IntersectionObserver`, and every animation and transition is neutralised under
`prefers-reduced-motion: reduce`.

**One type scale.** Display, title, subtitle, lead, body and meta are named
steps defined once in `src/index.css` and reused everywhere, so a change lands
in one place.

## Performance

The 3D stack is the bulk of the bundle and changes far less often than the site
code, so it is split into its own chunk:

| | size | gzip |
|---|---|---|
| app chunk | 604 kB | 199 kB |
| `vendor-three` (three, drei, r3f) | 1,108 kB | 308 kB |

The vendor chunk is stable across deploys, so repeat visits reuse it from cache.
`dist/assets` is also free of unused template assets.

## Accessibility

One `h1` and a sensible heading order; every form field has a label; every
image has an alt text; focus is visible via a green `:focus-visible` outline;
anchor navigation clears the fixed header (`scroll-padding-top`); the mobile
menu works; no console errors or warnings.

## Repository hygiene

- No secrets, keys or personal transcripts in the history.
- `githooks/pre-push` is a blocking sensitivity gate. Enable it once per clone:

      git config core.hooksPath githooks

  Its needles are written self-avoidantly (character-class breaks) so the hook
  can never match its own source and block every push forever.

## Licence

MIT — see `LICENSE`.
