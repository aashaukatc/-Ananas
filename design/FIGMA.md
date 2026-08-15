# Figma Design Source of Truth

Canonical editable design file:

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

## Current pages

| Page | Purpose | Figma node/page ID |
|---|---|---|
| `00 — Product Architecture` | Ananas core, verticalization layer, DIRT/Continuara/future products | `0:1` |
| `01 — Ananas Chat MVP` | Phase-1 conversational workspace and artifact/canvas layout | `1:21` |
| `02 — DIRT Reviewer Queue` | RCM human-reviewer prioritization and evidence workflow | `1:37` |
| `03 — No-PHI Data Contract` | Minimum DIRT audit schema and privacy boundary | `1:56` |

## Design governance

GitHub remains the durable source of truth for product requirements and architecture. Figma is the canonical editable UX/design artifact.

When a Figma decision changes a product contract:

1. update the corresponding Markdown specification in the same change set;
2. link the relevant Figma page/node;
3. update implementation acceptance criteria;
4. avoid allowing the design and repository specifications to drift independently.
