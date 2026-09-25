# Fonts

Self-hosted so a production build never has to reach fonts.googleapis.com. A
Vercel deploy failed on 2026-09-25 when `next/font/google` got an unparseable
response for one of these families and threw inside its loader, which takes the
whole build down. Nothing fetches Google at build time now.

These are the same latin woff2 subsets Google Fonts was serving, downloaded from
fonts.gstatic.com. All three families are licensed under the SIL Open Font
License 1.1.

| File | Family | Weight |
|---|---|---|
| `barlow-condensed-500.woff2` | Barlow Condensed | 500 |
| `barlow-condensed-600.woff2` | Barlow Condensed | 600 |
| `barlow-condensed-700.woff2` | Barlow Condensed | 700 |
| `newsreader-variable.woff2` | Newsreader | 400–600 (variable) |
| `newsreader-variable-italic.woff2` | Newsreader italic | 400–600 (variable) |
| `ibm-plex-mono-400.woff2` | IBM Plex Mono | 400 |
| `ibm-plex-mono-500.woff2` | IBM Plex Mono | 500 |
| `ibm-plex-mono-600.woff2` | IBM Plex Mono | 600 |

Newsreader is one variable file per style, which is why there's no file per
weight. `src/app/layout.tsx` declares it with a `400 600` range.

To change a weight or add a subset, download the new woff2 from Google Fonts
into this folder and add it to the matching `localFont` call in
`src/app/layout.tsx`. Keep the CSS variable names (`--font-display`,
`--font-body`, `--font-mono`); `globals.css` is wired to them.
