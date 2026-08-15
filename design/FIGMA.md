# Figma Design Source of Truth

## Active product/prototype file

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

This is the canonical editable product/prototype file for the current Ananas architecture and delivery stages.

| Page | Purpose | Page ID | Primary frame |
|---|---|---|---|
| `00 — Product Architecture` | Core → vertical product model | `0:1` | `1:2` — `Ananas Core → Vertical Products` |
| `01 — Ananas Chat MVP` | Chat-first project/workspace + artifact layout | `1:21` | `3:2` — `Ananas / Chat MVP / Desktop` |
| `02 — DIRT Reviewer Queue` | No-PHI revenue-prioritized human review workflow | `1:37` | `3:84` — `DIRT / Human Reviewer Queue / Desktop` |
| `03 — No-PHI Data Contract` | Ingress boundary + claim/line/signal/review schema | `1:56` | `3:176` — `DIRT / No-PHI Audit Data Contract` |
| `04 — Delivery Lifecycle & Scope` | Scope → PoC → Prototype → MVP → Pilot/Beta gates | `3:250` | `3:251` — `Ananas / Delivery Lifecycle / Scope Gates` |

All five pages now contain editable design content; page names alone are not treated as completion evidence.

## Legacy design reference

The earlier **Ananas — Product System & UX** file remains useful for brand, motion, and historical Command Center exploration:

https://www.figma.com/design/ElhDyoDtgwhQIFL7XujG4N

It is **not** the active Phase-1 product-definition file. Do not implement the old developer-infrastructure Command Center as the primary product surface merely because it exists in the legacy file.

## Prototype status

- Visual architecture: built
- Chat MVP desktop wireframe: built
- DIRT reviewer queue wireframe: built
- No-PHI data-contract board: built
- Delivery lifecycle/scope board: built
- Interaction wiring / usability walkthrough evidence: **still required before the Prototype gate is declared complete**

## Design governance

GitHub remains the durable source of truth for product requirements, stage gates, security, upstream policy, and architecture. Figma is the canonical editable UX/prototype artifact.

When a Figma decision changes a product contract:

1. update the corresponding Markdown specification in the same change set;
2. link the relevant Figma page/node;
3. update implementation acceptance criteria;
4. record whether the change is Scope, PoC, Prototype, MVP, or Pilot/Beta work;
5. do not allow design and repository specifications to drift independently.
