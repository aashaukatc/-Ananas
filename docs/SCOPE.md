# 🍍 Ananas Phase-1 Scope

**Status:** Defined / change-controlled  
**Applies to:** Ananas Core Phase-1 MVP  
**Audience:** founders, contributors, product/design, engineering, security, and vertical-product owners

This document is the boundary agreement for Phase 1. It exists to stop Ananas from becoming an unbounded attempt to rebuild every feature of ChatGPT, Claude, an IDE, an agent framework, and a healthcare platform at the same time.

## 1. Primary outcome

Ship a real, reusable **conversational work engine** that can later power DIRT, Continuara, and other vertical products without forking the core.

The Phase-1 product must prove one coherent workflow:

```text
Open project
  → converse over project context/files
  → use a governed tool/skill when needed
  → create or update a persistent artifact
  → preserve source/execution lineage
  → persist the work
  → expose the same capability through an API
```

## 2. Users

### Primary
- founder/operator using Ananas for real project work;
- early technical/product contributors;
- invited design partners during the later pilot/beta gate.

### Secondary
- DIRT and Continuara vertical-product developers;
- open-source contributors integrating skills, MCP servers, tools, and providers.

## 3. Phase-1 in scope

| Capability | Minimum Phase-1 boundary |
|---|---|
| Conversation | Multi-turn chat is the primary product surface. |
| Projects/workspaces | Create, resume, and isolate persistent project context. |
| Files | Attach/index project files and ground responses in them. |
| Source lineage | Preserve references to source files/evidence used in outputs. |
| Artifacts | Persistent, editable documents, code, tables, schemas, charts/structured data. |
| Artifact history | Basic revision metadata and reopen/resume behavior. |
| Tools/skills | Governed invocation with provenance, permissions, concise execution status, and audit trace. |
| Execution | Sandboxed coding/data/script execution with bounded permissions. |
| Model routing | LiteLLM-based provider abstraction with NVIDIA primary and OpenRouter alternate/fallback. |
| Context strategy | Provider context + project retrieval + summaries + persistent artifacts. |
| API | Server-side/headless access to the same Ananas core capabilities. |
| Telemetry | Route, latency, token use, retry/fallback, cost where available, and evaluated outcome. |
| Isolation | Project/tenant isolation primitives before multi-user vertical deployment. |
| Security | Secrets remain server-side/out of Git; least privilege for tools/connectors. |
| Vertical contract | A vertical can add policy, schemas, skills, tools, data contracts, evaluation, and specialized UI without forking core. |

## 4. Phase-1 explicit exclusions

These are **not bugs or missing MVP requirements**. They are intentionally deferred unless this scope is formally changed.

- training or fine-tuning a frontier foundation model from scratch;
- claiming a fixed native `1M` context window independent of the selected model/provider;
- full feature parity with ChatGPT, Claude, Gemini, Copilot, or any other general-purpose assistant;
- native iOS or Android applications;
- Google/Apple/social authentication;
- public skill/plugin marketplace;
- payment gateway, subscriptions, or commercial billing in the initial free MVP;
- consumer social/community features inside the product;
- PHI ingestion inside **Ananas Core**;
- EMR, clearinghouse, practice-management, or payer-portal replacement;
- automatic live claim submission or irreversible healthcare transactions;
- unrestricted autonomous shell/network/cloud actions;
- wholesale vendoring/forking of upstream repositories merely for convenience;
- adopting NVIDIA NeMo Agent Toolkit as a core dependency before its benchmark/adoption gate passes;
- custom GPU infrastructure when remote provider inference meets the workload economically.

## 5. Vertical boundary

Ananas Core remains domain-neutral.

A vertical pack may add:

- domain schemas and data contracts;
- domain retrieval corpora;
- domain policies/guardrails;
- domain skills/tools/connectors;
- domain evaluations;
- specialized workflow modules;
- specialized UI views.

It may **not** redefine core conversation, artifact, routing, execution, provenance, or project-isolation contracts without an architecture decision applying to all verticals.

### DIRT

DIRT is the first vertical. Its MVP is No-PHI, audit-first, human-reviewed, and does not submit live claims. See [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md).

### Continuara

Continuara is a future separate healthcare vertical. It must define its own clinical/privacy/security boundary rather than inheriting DIRT's No-PHI assumptions automatically.

## 6. Upstream reuse boundary

Ananas should **reuse before rebuilding**.

Canonical upstream set:

1. `NVIDIA/skills` — Tier 1 / curated install
2. `vercel-labs/skills` — Tier 1 / dependency
3. `microsoft/skills` — Tier 1 / curated install
4. `modelcontextprotocol/servers` — Tier 1 / reference and pin
5. `NVIDIA/NeMo-Agent-Toolkit` — Tier 2 / evaluate before adoption

The exact reviewed revisions live in [`config/upstreams.yaml`](../config/upstreams.yaml). Use [`scripts/upstreams/fetch-pinned.sh`](../scripts/upstreams/fetch-pinned.sh) to obtain those revisions into a local Git-ignored cache. Do not copy whole upstream repositories into Ananas source control.

## 7. Design scope

Canonical active product/prototype file:

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Required prototype surfaces:

- Product Architecture
- Ananas Chat MVP
- DIRT Reviewer Queue
- No-PHI Data Contract
- Delivery Lifecycle & Scope

The older Product System & UX Figma file remains a legacy brand/design reference; it is not the active product-definition source.

## 8. Delivery stages

Ananas uses five explicit gates:

1. **Scope** — boundary agreement.
2. **Proof of Concept** — technical feasibility/risk retirement.
3. **Prototype** — UX/design validation with non-production data.
4. **MVP** — real working product satisfying the acceptance contract.
5. **Pilot/Beta** — limited release to measure reliability, onboarding, and real-user behavior before broader launch.

See [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md).

## 9. Scope-change rule

A proposed feature enters Phase 1 only when all are true:

1. it is necessary to satisfy an existing MVP acceptance gate **or** a documented blocker proves the MVP cannot work without it;
2. an Issue states the user/business outcome;
3. its dependency, security, cost, and upstream-reuse impact are known;
4. the Scope and Roadmap are updated in the same pull request when the boundary changes.

Otherwise the feature is deferred.

## 10. Definition of scope completion

The Scope gate is complete when:

- the in-scope list is explicit;
- exclusions are explicit;
- Figma surfaces are named;
- upstream dependencies are named and governed;
- MVP acceptance criteria are linked;
- vertical boundaries are clear;
- contributors can classify a new request as **Phase 1**, **vertical-specific**, or **deferred** without guessing.
