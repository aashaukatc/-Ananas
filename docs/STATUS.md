# 🍍 Ananas Current Status

**As of:** 2026-08-15  
**Canonical roadmap phase:** Phase 1 — Ananas Conversational MVP  
**MVP status:** not yet achieved

This file is a concise status view. It does not replace `SCOPE.md`, `DELIVERY_LIFECYCLE.md`, `MVP.md`, or `ROADMAP.md`.

## Delivery gates

| Gate | State | Next evidence |
|---|---|---|
| Scope | ✅ Defined | Change only through explicit scope-impact PR |
| Proof of Concept | 🟡 Active / partial | Provider failover, persistence/isolation, file grounding, artifact persistence, governed tool/skill, sandbox, API parity |
| Prototype | 🟡 Visual prototype built | Interaction wiring / walkthrough validation and recorded UX findings |
| MVP | ⚪ Not yet achieved | Real implementation + all `MVP.md` acceptance gates |
| Pilot / Beta | ⚪ Not started | Begins after MVP release-candidate + required security/ops readiness |

Delivery-gate execution: [GitHub Issue #37](https://github.com/aashaukatc/-Ananas/issues/37).

## Product surfaces

- Active Figma: https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ
- Chat-first Next.js shell: `app/`
- DIRT reviewer/data-contract prototype: active Figma pages 02–03
- Legacy Command Center design: reference only

## Upstream reuse

Canonical upstream count: **5**

- Tier 1: 4
- Tier 2: 1
- wholesale vendoring: disabled
- registry validation: `scripts/upstreams/validate-registry.sh`
- pinned fetch: `scripts/upstreams/fetch-pinned.sh`
- local cache: `.ananas/upstreams/` (Git-ignored)

## Current critical path

1. Pass real provider routing/failover PoC.
2. Build session/project persistence + isolation.
3. Build file indexing/retrieval + source lineage.
4. Build artifact persistence/revisions.
5. Integrate one approved Tier-1 capability behind an Ananas adapter.
6. Prove sandbox controls.
7. Expose API parity.
8. Add task-level telemetry/cost/outcome accounting.
9. Pass Core MVP acceptance gates.
10. Build DIRT against the accepted shared core and reuse existing RCM data assets through an adapter.

## Rule

> Never upgrade the status because a screen looks finished. Upgrade it only when the stage-specific evidence exists.
