# 🍍 Ananas Brand System

## Brand idea
Ananas is a **compact, cloud-native conversational work engine**: familiar enough to feel immediately usable, but structured around persistent projects, governed tools, durable artifacts, reusable vertical packs, and cost-aware provider routing.

The product should feel capable and technical without looking like an IDE-only control plane or a generic consumer chatbot clone.

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
Inter or a neutral system sans. Use compact tracking for display headings, normal tracking for UI text, and monospace only for code/model IDs, schema fields, and technical identifiers.

## Product UI principles
1. **Conversation first.** The main surface is work-through-conversation, not an infrastructure dashboard.
2. **Projects provide memory.** Files, conversations, artifacts, and tools should visually belong to a project/workspace.
3. **Artifacts stay visible.** Important outputs should be editable/reopenable beside chat rather than disappearing into message history.
4. **Technical state is available, not dominant.** Model route, execution status, source lineage, and cost are visible when useful but should not crowd the primary task.
5. **Verticals feel specialized without forking the core.** DIRT may look operational/RCM-specific while retaining the Ananas project/chat/artifact grammar.
6. **Dark-first, high-contrast, low visual noise.** Prefer rails, lists, tables, editors, and open canvases over card-grid overload.
7. **One strong lime action per decision area.** Gold signals caution/attention; green signals healthy/validated state.
8. **Do not mimic competitors literally.** Borrow familiar interaction patterns, not proprietary visual identity.
9. **3D motion is a focal asset, not ambient clutter.** Use it in onboarding/brand moments rather than every work surface.
10. Respect `prefers-reduced-motion` and always retain a static SVG fallback.

## Voice
Plainspoken, technical, concise, evidence-oriented. Avoid unsupported model claims, inflated autonomy language, and pretending prototype behavior is production capability.

## Product-stage language
Use stage names precisely:

- **Scope** — boundary agreement
- **PoC** — technical feasibility evidence
- **Prototype** — UX/design validation
- **MVP** — real working product
- **Pilot/Beta** — limited real-user release

Do not call a Figma screen an MVP or call infrastructure readiness a finished product.
