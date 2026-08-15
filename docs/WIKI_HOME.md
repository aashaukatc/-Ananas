# 🍍 Ananas Wiki Home

Ananas is a cloud-native, provider-portable conversational work engine. Ananas Core provides shared conversation, projects, files/context, artifacts, tools/skills, execution, API, model routing, and telemetry. DIRT RCM is the first specialized vertical built on those contracts.

## Start here

1. [Phase-1 Scope](SCOPE.md)
2. [Delivery Lifecycle](DELIVERY_LIFECYCLE.md)
3. [MVP definition](MVP.md)
4. [Product](PRODUCT.md)
5. [Architecture](ARCHITECTURE.md)
6. [Roadmap](ROADMAP.md)
7. [DIRT RCM vertical](DIRT_VERTICAL.md)
8. [Upstream reuse policy](UPSTREAMS.md)
9. [Projects / execution model](PROJECTS.md)
10. [Design Hub](DESIGN.md)
11. [Figma source](../design/FIGMA.md)
12. [Setup](SETUP.md)
13. [Security](../SECURITY.md)
14. [Cost Strategy](COST_STRATEGY.md)
15. [Brand](BRAND.md)
16. [Collaboration & Sponsorship](COLLABORATION.md)

## Product hierarchy

```text
Ananas Core
   ├── general-purpose conversational product
   ├── DIRT RCM vertical pack
   ├── Continuara vertical pack
   └── future specialized products
```

Verticals reuse the core. They do not fork it.

## Delivery state

| Gate | State |
|---|---|
| Scope | Defined |
| Proof of Concept | Active / partial |
| Prototype | Visual prototype built; interaction/usability validation pending |
| MVP | Not yet achieved |
| Pilot / Beta | Not started |

Do not infer MVP completion from infrastructure readiness, a successful PoC, or a polished Figma frame.

## Current product phase

**Roadmap Phase 1 — Ananas Conversational MVP is active.**

Current critical path:

1. prove provider routing/fallback end-to-end;
2. implement persistent project/workspace identity and isolation;
3. implement file-grounded context + source lineage;
4. implement persistent artifact/canvas behavior;
5. prove governed tool/skill execution and sandboxing;
6. expose the same core through an API;
7. instrument latency/token/cost/outcome telemetry;
8. complete MVP acceptance evidence;
9. then promote DIRT from defined vertical design into its build phase.

## Upstream reuse

Canonical upstream set: **4 Tier-1 + 1 Tier-2 = 5 repositories**.

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

Reviewed upstream source is fetched into `.ananas/upstreams/`, which remains Git-ignored. Presence in the cache is not automatic adoption or execution permission.

## Source-of-truth hierarchy

- `docs/SCOPE.md` — Phase-1 boundary
- `docs/DELIVERY_LIFECYCLE.md` — stage-gate evidence
- `docs/ROADMAP.md` — phase sequencing
- `docs/MVP.md` — MVP acceptance
- GitHub Issue / PR — work-item/change truth
- Figma — active editable prototype/design truth
- GitHub Projects — planning state only

## Governance surfaces

- Issues: execution units and acceptance criteria
- Pull requests: implementation/change review and durable decision history
- `docs/PROJECTS.md`: project-board operating model
- `docs/WIKI_HOME.md`: version-controlled Wiki seed
- `docs/UPSTREAMS.md` + `config/upstreams.yaml`: dependency/provenance governance
- `design/FIGMA.md`: active/legacy Figma inventory

If GitHub Wiki, Projects, or Discussions are enabled in repository settings, this version-controlled material should seed those surfaces rather than becoming a second independent specification.
