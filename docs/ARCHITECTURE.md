# 🍍 Ananas Architecture

## 1. Purpose

Ananas is a cloud-native, provider-portable conversational work engine. It provides the reusable substrate for chat, project context, files, artifacts, tools, skills, execution, APIs, telemetry, and model routing. Domain products such as DIRT RCM extend this substrate through vertical packs instead of forking the core.

The existing Codespaces/GCP/Continue/LiteLLM foundation remains the engineering and execution platform underneath Ananas.

GitHub is the durable control plane. Development environments may be disposable; source, configuration, product contracts, documentation, benchmarks, upstream pins, and automation remain version controlled.

Phase-1 boundaries are controlled by [`SCOPE.md`](SCOPE.md). Delivery-stage evidence is controlled by [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md).

## 2. Product Architecture

```text
User / Vertical Product
        │
        ▼
┌──────────────────────────────────────────────┐
│              ANANAS EXPERIENCE              │
│ Chat • Projects • Files • Artifact/Canvas   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                ANANAS CORE                  │
│ Context • Tool/Skill Runtime • API          │
│ Artifact Services • Execution • Telemetry   │
│ Policy/Approval • Model Router              │
└───────────────┬───────────────────┬──────────┘
                │                   │
                ▼                   ▼
        Vertical Packs        Upstream Adapters
        DIRT / Continuara     Skills / MCP / SDKs
                │                   │
                └─────────┬─────────┘
                          ▼
                    LiteLLM Gateway
                          │
                  ┌───────┴────────┐
                  ▼                ▼
             NVIDIA route      OpenRouter
                primary       alternate/fallback
```

## 3. Vertical Pack Contract

A vertical pack may add:

- domain skills;
- domain prompts/policies;
- connector adapters;
- schemas/data contracts;
- retrieval/reference corpora;
- evaluation suites;
- workflow modules;
- specialized product screens;
- domain-specific approval gates.

A vertical pack must not:

- duplicate the Ananas conversation/runtime core;
- directly hard-code provider credentials;
- bypass tenant/project isolation;
- bypass audit/approval policy;
- force unrelated domain assumptions into core.

## 4. Runtime / Development Architecture

```text
Developer
   │
   ▼
Browser / VS Code client
   │
   ├──────────────────────────────────────┐
   │                                      │
   ▼                                      ▼
GitHub Codespaces                 Google Compute Engine
PRIMARY DEVELOPMENT               OPTIONAL PERSISTENT
   │                                      │
   ├── Git + GitHub                       ├── Git + GitHub
   ├── Node.js / Python                   ├── Node.js / Python
   ├── Continue                           ├── code-server + Continue
   ├── tests / linters                    ├── tests / linters
   │                                      │
   └──────────────────┬───────────────────┘
                      ▼
                LiteLLM gateway
                      │
             Remote AI inference
                      │
             ┌────────┴────────┐
             ▼                 ▼
       NVIDIA route        OpenRouter
          primary      alternate/fallback

GitHub repository = durable source of truth
```

## 5. Core Service Boundaries

### Conversation and Context

Owns conversation state, project context, source references, retrieval inputs, and resumability. Raw provider context windows are treated as a routing capability rather than the platform's memory model.

### Artifact Service

Persists work products independently of chat messages: documents, code, tables, charts, schemas, and structured outputs.

### Tool / Skill Runtime

Normalizes installable capabilities behind Ananas-owned interfaces. Upstream skills and MCP implementations remain provenance-tracked and permission-scoped.

### Execution Sandbox

Runs code/data/script workloads with explicit filesystem/network/process boundaries. High-impact operations require a stronger policy/approval profile than read-only analysis.

### Model Router

LiteLLM remains the provider-neutral routing boundary. Routing policy can consider capability, correctness, context needs, latency, availability, and cost.

### Telemetry

Records task-level operational metrics including route, latency, token usage, estimated/actual provider cost where available, errors, retries, and outcome/evaluation signals.

### API

Exposes reusable core capabilities to the Ananas UI and vertical products such as DIRT without requiring those products to embed the general-purpose interface.

## 6. Responsibility Boundaries

### GitHub

- source of truth;
- repository governance;
- CI/CD;
- product/architecture contracts;
- upstream version registry;
- benchmark definitions/results;
- issue/PR decision history.

### GitHub Codespaces

- primary interactive development environment;
- disposable compute;
- build/test execution;
- browser-accessible development without local GPU dependence.

### Google Compute Engine

- optional persistent runtime/development environment;
- production-like Linux/systemd behavior;
- integration/deployment targets;
- persistent services and networking/IAM validation.

### Continue

- developer-facing AI coding interface;
- not the end-user definition of Ananas;
- useful for building and operating the platform.

### LiteLLM

- provider-neutral gateway;
- provider authentication boundary;
- retries/failover;
- routing abstraction.

## 7. DIRT RCM Boundary

DIRT is implemented above Ananas Core:

```text
DIRT UI / RCM Workflow
       │
       ├── Reviewer Queue
       ├── Revenue/Denial Signals
       ├── RCM Policies & SOPs
       ├── No-PHI Data Contract
       └── RCM Evaluations
       │
       ▼
Ananas Core API / Tool / Artifact / Model Services
```

DIRT's initial No-PHI intelligence payload excludes direct patient identifiers and identifiable free-text clinical material. The exact schema is defined in [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md). Formal privacy/security review remains required before asserting that a production dataset satisfies a legal de-identification standard.

DIRT's design/data contract may progress in parallel, but DIRT is not treated as a completed or production MVP until the shared Ananas Core contracts it relies on are implemented and the DIRT-specific acceptance evidence exists.

## 8. Security Model

1. Repository contains templates, never production credentials.
2. Provider/API keys are injected at runtime through protected secrets/environment mechanisms.
3. Public Git history is assumed permanent.
4. Provider credentials remain server-side and are not exposed to client UI.
5. Tenant/project context must be explicitly scoped at storage, retrieval, tool, and artifact boundaries.
6. Tools/skills receive least privilege and provenance/version metadata.
7. Sandboxed execution is separated from privileged operational actions.
8. Sensitive/irreversible actions require explicit policy and approval gates.
9. DIRT ingestion enforces its privacy contract before No-PHI model processing, with reject/quarantine behavior for payloads that violate it.
10. GCP identity should prefer workload identity/OIDC over long-lived keys as the platform matures.

## 9. Cost Model

Resource allocation follows this order:

1. included GitHub/Codespaces capacity;
2. low-cost/free promotional inference where it meets quality requirements;
3. GCP student/credit-backed infrastructure where persistence or deployment adds value;
4. paid inference/compute only when justified by task outcome, reliability, context needs, or latency.

Model and framework promotion is based on measured successful tasks per dollar, not headline capability alone.

## 10. Upstream Strategy

Canonical upstream policy and pins live in:

- [`UPSTREAMS.md`](UPSTREAMS.md)
- [`../config/upstreams.yaml`](../config/upstreams.yaml)

Four Tier-1 repositories are reused through curated installs, dependencies, or pinned references. `NVIDIA/NeMo-Agent-Toolkit` is Tier 2 and remains outside core until benchmarked.

Reviewed source can be obtained reproducibly without vendoring it:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

The fetched cache lives under `.ananas/upstreams/` and is excluded from Git history.

## 11. Current Evolution

Foundation already available:

- Codespaces-first development;
- hardened persistent GCP path;
- NVIDIA/OpenRouter routing design;
- LiteLLM provider abstraction;
- chat-first web application shell;
- model benchmark criteria;
- governed 5-repository upstream registry + pinned fetch workflow;
- editable Core/DIRT Figma prototypes.

**Current build milestone:** Phase-1 Ananas conversational MVP.

Current implementation priorities:

- real session/project persistence and isolation;
- file-grounded context + source lineage;
- artifact persistence/revisions;
- governed tool/skill runtime;
- sandbox execution;
- provider route/failover PoC evidence;
- shared API and telemetry.

**Next vertical milestone after shared-core acceptance:** DIRT implementation against the defined No-PHI/reviewer contracts while reusing existing RCM data assets behind a DIRT adapter.

See [`SCOPE.md`](SCOPE.md), [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md), [`MVP.md`](MVP.md), [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md), and [`ROADMAP.md`](ROADMAP.md).
