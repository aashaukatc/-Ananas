# 🍍 Ananas MVP

## Status

**MVP is defined but not yet achieved.**

Current delivery state:

- Scope — defined
- PoC — active / partial
- Prototype — visual prototype built; interaction/usability validation pending
- MVP — implementation/acceptance backlog active
- Pilot/Beta — not started

See [`SCOPE.md`](SCOPE.md) and [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md).

## Product definition

Ananas is a standalone, cloud-native conversational work engine. Its interaction model is intentionally familiar to users of modern assistants, but Ananas is designed around operational work, persistent projects, reusable skills, governed tools, structured artifacts, source lineage, cost-aware routing, and domain-specific vertical products.

Ananas is **not** DIRT and is **not** limited to healthcare RCM. DIRT is the first real vertical product powered by Ananas.

## Phase-1 MVP thesis

Phase 1 proves that Ananas can operate as a useful home-grown general-purpose work assistant before a real domain vertical is required for completion.

The MVP must support:

1. Multi-turn conversational chat.
2. A real user/session identity path appropriate to the release audience.
3. File attachment/indexing and project-grounded context.
4. Persistent project/workspace organization and isolation.
5. Model routing through LiteLLM with NVIDIA as primary and OpenRouter as alternate/fallback.
6. Tool and skill invocation with explicit provenance, permission boundary, and execution trace.
7. Persistent artifact creation/editing beside conversation: documents, code, tables, schemas, charts, and structured outputs.
8. Basic artifact revision/reopen behavior.
9. Sandboxed code/script/data execution.
10. API-first/headless access to the same core capabilities.
11. Citations/source lineage where attached or external evidence is used.
12. Usage, latency, token, retry/fallback, cost, and task-outcome telemetry.
13. Provider portability and configuration-driven routing.
14. Security boundaries that keep secrets out of Git/UI and isolate project/tenant context.
15. A **minimal synthetic vertical-pack fixture** proving that domain configuration can register/load without forking or modifying core conversation/routing/execution contracts.

A real DIRT or Continuara implementation is **not** required to finish the Ananas Core Phase-1 MVP. DIRT begins its own implementation phase after the shared-core contract is proven.

## Phase-1 non-goals

The MVP does not need to:

- train a foundation model from scratch;
- match every feature of commercial general-purpose assistants;
- run a native 1-million-token model itself;
- ship native mobile applications;
- support Google/Apple/social authentication;
- include billing/subscription/payment infrastructure in the initial free MVP;
- create a public plugin/skill marketplace;
- become an EMR, clearinghouse, billing system, or clinical record system;
- accept PHI inside Ananas Core;
- execute irreversible healthcare transactions without domain-specific approval controls;
- vendor or fork large upstream frameworks without demonstrated need;
- adopt NVIDIA NeMo Agent Toolkit as core merely because it is available;
- ship DIRT or Continuara merely to prove the generic vertical-pack interface.

Large-context capability is a **routing + context-management capability**, not a hard-coded model-size promise. The system should use the reliable context supported by the selected provider/model while extending practical working context with retrieval, project memory, summarization, files, and artifact persistence.

## Core interaction model

```text
Project / Workspace Context
        │
        ▼
Conversation ───────► Artifact / Canvas
        │                    │
        ├── Skills           ├── Documents
        ├── Tools            ├── Code
        ├── Connectors       ├── Tables
        ├── Models           ├── Schemas
        └── Files            └── Charts
        │
        ▼
Execution / Routing / Telemetry
        │
        ▼
LiteLLM → NVIDIA primary → OpenRouter alternate/fallback
```

## Verticalization model

A vertical product inherits Ananas Core and adds only what is domain-specific:

- domain skills;
- policy/guardrail packs;
- connectors;
- retrieval corpora;
- schemas/data contracts;
- evaluation suites;
- workflow modules;
- specialized UI views.

Do **not** fork the core product for each vertical.

```text
Ananas Core
   │
   ├── synthetic vertical fixture  ← Phase-1 contract test only
   ├── DIRT RCM                    ← later real vertical
   ├── Continuara                  ← later real vertical
   └── Future verticals
```

## PoC prerequisites to retire before MVP release candidate

The MVP should not hide unresolved architecture risk behind UI mocks. At minimum, the PoCs in [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md) must demonstrate:

- real provider routing/fallback;
- project persistence/isolation;
- file grounding + source lineage;
- artifact persistence/revision;
- governed Tier-1 tool/skill invocation;
- sandbox boundary behavior;
- API parity;
- pinned upstream retrieval/adaptation;
- minimal synthetic vertical-pack registration/loading.

## MVP acceptance gates

Phase-1 MVP is complete only when all of the following are true from a clean supported deployment path:

1. A user can open Ananas in a browser and establish the supported session/identity.
2. A user can create and later resume a project.
3. Project context is isolated from another project/tenant fixture.
4. A user can attach a file and ask a question grounded in it with source lineage.
5. A user can invoke an approved tool/skill and see concise execution/provenance status.
6. A user can create, edit, close, reopen, and revise a persistent artifact beside chat.
7. A user can run a bounded sandboxed coding/data task without exposing provider/host secrets.
8. Inference routes through the configured provider gateway without provider credentials reaching the UI.
9. Primary and alternate/fallback provider behavior is tested.
10. Basic latency/token/cost/retry/outcome telemetry can be inspected.
11. The same core workflow can be invoked through an API without duplicating product logic.
12. A **synthetic test vertical pack** can be registered/loaded without modifying core conversation/routing/execution implementation; no real healthcare vertical is required for this gate.
13. CI/build/tests pass from a clean checkout.
14. No critical security/privacy issue remains open for the MVP path.
15. User-visible capabilities do not claim backend behavior that exists only in the prototype.

## Free-MVP commercialization rule

A payment gateway is common in commercial SaaS MVPs, but it is not intrinsically required for every MVP. The initial Ananas thesis is a **free/open, low-cost work engine**; therefore payment and subscription infrastructure is deliberately excluded from the Phase-1 acceptance gate.

If commercialization becomes a target, billing is introduced as its own scoped capability with entitlement, abuse, privacy, tax, support, and unit-economics requirements rather than being bolted into the core prematurely.

## Product hierarchy

| Layer | Purpose |
|---|---|
| Ananas Core | Reusable conversation, context, artifacts, tools, routing, execution, API, telemetry |
| Synthetic vertical fixture | Phase-1 interface/registration test; contains no real domain or healthcare logic |
| Vertical Pack | Domain policy, skills, schemas, connectors, evaluations, workflow modules |
| Product Surface | Specialized UX such as the DIRT Reviewer Queue |
| Development/Deployment | Codespaces for development; GCP when persistence/deployment workloads justify it |

## Canonical Figma artifact

Design file: https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Pages:

- `00 — Product Architecture`
- `01 — Ananas Chat MVP`
- `02 — DIRT Reviewer Queue`
- `03 — No-PHI Data Contract`
- `04 — Delivery Lifecycle & Scope`

The Figma artifact is prototype/design evidence. It is not evidence that MVP backend behavior is complete.
