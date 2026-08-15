# 🍍 Ananas Brand System

## Brand idea
Ananas is the sharp, compact, cloud-native autonomous software engineering workspace. The name refers to pineapple across multiple languages and gives the project a memorable, global symbol.

## Mark
The canonical mark is a **geometric 3D pineapple bot**: elongated pineapple wireframe, angular leaf crown/spikes, restrained robotic visor, and three flowing infrastructure waves.

- **Body:** Pineapple Gold `#FFC857`
- **Crown:** Leaf Green `#48D17A`
- **Visor / primary signal:** Acid Lime `#C8FF3D`
- **Environment:** Forest / Night backgrounds
- **Meaning of waves:** remote inference, provider routing, and fallback—not decorative confetti

Avoid human faces, generic AI brains, circuit-board clichés, rainbow neon, or overly playful cartoon styling.

The full motion specification lives in [`MOTION.md`](MOTION.md). Production code lives in `components/ananas-logo-3d.tsx`.

## Palette
- Night `#050A08` — deepest canvas / hero background
- Forest `#0B1511` — primary background
- Surface `#122019` — cards/panels
- Surface 2 `#182A21` — elevated controls
- Acid Lime `#C8FF3D` — primary action/accent
- Leaf Green `#48D17A` — healthy/success state
- Pineapple Gold `#FFC857` — warning/highlight / pineapple body
- Cream `#F5F7ED` — primary text
- Muted `#95A39B` — secondary text
- Border `#26382E` — separators

## Typography
Inter or a neutral system sans. Use compact tracking for display headings, normal tracking for UI text, and monospace only for code/model IDs.

## UI principles
1. Dark-first, high-contrast, low visual noise.
2. One strong lime action per view.
3. Prefer rails, tables, and open workspace surfaces over card-grid overload.
4. Operational states are visible but quiet.
5. Product UI must feel like developer infrastructure, not a consumer chatbot.
6. Responsive behavior must preserve task and model-routing clarity.
7. 3D motion is a focal asset, not ambient clutter; use it in hero/command surfaces only.
8. Respect `prefers-reduced-motion` and always retain a static SVG fallback.

## Voice
Plainspoken, technical, concise, confident. Avoid hype and unsupported model claims.
