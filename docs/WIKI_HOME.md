# 🍍 Ananas Wiki Home

Ananas is a cloud-native, provider-portable conversational work engine. Phase 1 delivers the reusable general-purpose assistant core; DIRT RCM is the first specialized vertical built on top of it.

## Start here

- [MVP definition](MVP.md)
- [Product](PRODUCT.md)
- [Architecture](ARCHITECTURE.md)
- [DIRT RCM vertical](DIRT_VERTICAL.md)
- [Upstream reuse policy](UPSTREAMS.md)
- [Roadmap](ROADMAP.md)
- [Projects / execution model](PROJECTS.md)
- [Setup](SETUP.md)
- [Security](../SECURITY.md)
- [Cost Strategy](COST_STRATEGY.md)
- [Design Hub](DESIGN.md)
- [Figma source](../design/FIGMA.md)
- [Brand](BRAND.md)
- [Collaboration & Sponsorship](COLLABORATION.md)

## Product hierarchy

```text
Ananas Core
   ├── general-purpose Phase-1 conversational product
   ├── DIRT RCM vertical
   ├── Continuara vertical
   └── future specialized products
```

## Source-of-truth rule

GitHub is the durable product, engineering, governance, benchmark, and decision source of truth. Figma is the canonical editable design surface and is linked back into GitHub specifications.

## Current phase

**Active:** Phase-1 Ananas conversational MVP.

Current critical work:

1. conversation + project/workspace shell;
2. file-grounded context;
3. artifact/canvas persistence;
4. tool/skill runtime;
5. provider routing validation;
6. telemetry/cost controls;
7. DIRT vertical adapter and No-PHI ingress boundary.

## Governance surfaces

- Issues: execution units and acceptance criteria
- Pull requests: implementation/change review and durable decision history
- `docs/PROJECTS.md`: recommended project-board model
- `docs/WIKI_HOME.md`: version-controlled Wiki seed
- `docs/UPSTREAMS.md` + `config/upstreams.yaml`: dependency/provenance governance
- Figma: UX/product design

If GitHub Wiki, Projects, or Discussions are enabled in repository settings, this version-controlled documentation should seed those surfaces rather than becoming an independent source of truth.
