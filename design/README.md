# 🍍 Ananas Design Archive

GitHub is the durable product/specification source of truth. Figma is the active editable product/prototype surface. Canva is collateral support.

## Active Figma

Start with [`FIGMA.md`](FIGMA.md).

Active product/prototype file:

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

It contains the current Core architecture, Chat MVP, DIRT Reviewer Queue, No-PHI contract, and delivery lifecycle/scope boards.

## Figma manifest

[`figma/manifest.json`](figma/manifest.json) records both:

- the **active product/prototype file**; and
- the **legacy Product System & UX file** retained for brand/motion/historical reference.

Do not treat the legacy Command Center design as the current primary product UI.

## Canva

[`canva/manifest.json`](canva/manifest.json) records the Ananas folder and selected logo/social collateral IDs.

Canva collateral is not product-definition truth. Legacy engineering-workspace copy is explicitly marked before reuse.

## Runtime brand source

- [`../components/ananas-logo-3d.tsx`](../components/ananas-logo-3d.tsx) — production Three.js mark.
- [`../components/ananas-glyph.tsx`](../components/ananas-glyph.tsx) — lightweight navigation/static fallback mark.
- [`source/ananas-logo-concept.html`](source/ananas-logo-concept.html) — standalone reference implementation.
- [`../public/brand/ananas-mark.svg`](../public/brand/ananas-mark.svg) — portable static mark.

## Stage rule

A polished design is **Prototype evidence**, not MVP evidence. Real persistence, security, tool execution, routing, API, and telemetry behavior must pass the acceptance gates in `docs/MVP.md` before being called MVP capability.

## Drift rule

When a visual artifact and product code/spec disagree:

1. identify whether the product contract intentionally changed;
2. update GitHub specs and Figma together when it did;
3. fix implementation drift when it did not;
4. do not silently promote a legacy or exploratory design into the active product definition.
