# 🍍 Ananas Design Archive

GitHub is the product source of truth. Figma and Canva are editable collaboration surfaces; this directory versions the identifiers, links, implementation rules, and portable source needed to reproduce the brand.

## Figma
See [`figma/manifest.json`](figma/manifest.json). It records every Ananas page and exportable frame/node ID, including the Motion & 3D specification.

## Canva
See [`canva/manifest.json`](canva/manifest.json). It records the Ananas folder and selected logo/social collateral IDs.

## Runtime brand source
- [`../components/ananas-logo-3d.tsx`](../components/ananas-logo-3d.tsx) — production Three.js mark used in the app.
- [`../components/ananas-glyph.tsx`](../components/ananas-glyph.tsx) — lightweight navigation/static fallback mark.
- [`source/ananas-logo-concept.html`](source/ananas-logo-concept.html) — standalone reference implementation.
- [`../public/brand/ananas-mark.svg`](../public/brand/ananas-mark.svg) — portable static mark.

## Drift rule
When a visual artifact and production code disagree, the repository documentation and production behavior win until the Figma/Canva surfaces are intentionally resynchronized.
