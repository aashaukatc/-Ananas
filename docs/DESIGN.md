# Ananas Design Hub

GitHub is the durable source of truth for requirements, architecture, delivery gates, security, and implementation. Figma is the canonical editable UX/prototype surface.

## Active product/prototype Figma

**🍍 Ananas — MVP Product & DIRT Vertical**  
https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Current editable pages:

1. Product Architecture
2. Ananas Chat MVP
3. DIRT Reviewer Queue
4. No-PHI Data Contract
5. Delivery Lifecycle & Scope

See [`../design/FIGMA.md`](../design/FIGMA.md) for exact page/frame IDs and current prototype status.

## Legacy Figma reference

**🍍 Ananas — Product System & UX**  
https://www.figma.com/design/ElhDyoDtgwhQIFL7XujG4N

This older file remains a reference for brand, motion, the 3D mark, and historical Command Center exploration. Its old developer-infrastructure dashboard is **not** the active product definition.

## Repository design archive

- `design/FIGMA.md` — active Figma inventory and governance.
- `design/figma/manifest.json` — machine-readable active + legacy Figma inventory.
- `design/README.md` — design archive rules and portable source.
- `design/canva/manifest.json` — selected Canva folder/design IDs and canonical links.
- `design/source/ananas-logo-concept.html` — standalone 3D logo reference.
- `public/brand/ananas-mark.svg` — static portable fallback.

## Canva

**Ananas workspace folder**  
https://www.canva.com/folder/FAHSUiWlSAc

Canva is collateral/presentation support, not product-definition truth.

## Canonical implementation references

- `docs/SCOPE.md` — Phase-1 inclusions/exclusions.
- `docs/DELIVERY_LIFECYCLE.md` — Scope/PoC/Prototype/MVP/Pilot gates.
- `docs/BRAND.md` — palette, mark, typography, voice and UI principles.
- `docs/MOTION.md` — Three.js geometry, animation, performance and accessibility.
- `docs/PRODUCT.md` — product surfaces and core/vertical interaction model.
- `docs/MVP.md` — functional MVP acceptance contract.
- `app/` — executable product shell.
- `components/ananas-logo-3d.tsx` — production animated mark.

## Drift rule

When design and code disagree:

1. determine whether the discrepancy is a deliberate product-contract change or implementation drift;
2. update the product specification and Figma together when the contract changed;
3. update code to match the approved prototype when the contract did not change;
4. never treat a polished prototype as proof that MVP backend behavior exists.
