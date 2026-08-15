# Ananas Motion & 3D Specification

## Runtime implementation
The production mark is implemented in `components/ananas-logo-3d.tsx` with Three.js. Three.js is pinned in `package.json`; the standalone reference is `design/source/ananas-logo-concept.html`.

## Geometry
- Elongated wireframe sphere for the pineapple body.
- Two-layer crown made from low-poly cones.
- Split rectangular visor with a narrow bridge.
- Three line-based infrastructure waves passing behind and through the mark.

## Motion
Keep movement calm and infrastructural:
- Y rotation: approximately ±0.34 radians, slow sine motion.
- X tilt: approximately ±0.07 radians around a small negative resting tilt.
- Vertical float: approximately ±0.08 scene units.
- Crown rotation: extremely slow drift.
- Waves: different low speeds and frequencies to imply routing rather than equal synchronized animation.

## Accessibility
When `prefers-reduced-motion: reduce` is active, freeze the mark at a composed keyframe and render the waves once. Never require animation to understand the logo.

## Performance
- Cap device pixel ratio at 2.
- Resize through `ResizeObserver`.
- Dispose geometries, materials, renderer, observer, and animation frame on unmount.
- Use only one large WebGL mark per page; use `AnanasGlyph` or `public/brand/ananas-mark.svg` in navigation and metadata.

## Figma
The editable visual specification is page **05 — Motion & 3D**, frame `3:151`, in the Ananas Figma file. See `design/figma/manifest.json`.
