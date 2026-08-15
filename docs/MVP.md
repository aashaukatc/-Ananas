# 🍍 Ananas MVP

## Product definition

Ananas is a standalone, cloud-native conversational work engine. Its interaction model is intentionally familiar to users of modern assistants such as ChatGPT and Claude, but Ananas is designed to become progressively more specialized around operational work, reusable skills, governed tools, structured artifacts, and domain-specific products.

Ananas is **not** DIRT and is **not** limited to healthcare RCM. DIRT is the first vertical product powered by Ananas.

## Phase 1 MVP thesis

Phase 1 proves that Ananas can operate as a useful home-grown general-purpose work assistant before vertical specialization.

The MVP must support:

1. Multi-turn conversational chat.
2. File attachment and project context.
3. Persistent project/workspace organization.
4. Model routing through LiteLLM with NVIDIA as primary and OpenRouter as alternate/fallback.
5. Tool and skill invocation with explicit execution traces.
6. Artifact creation beside the conversation: documents, code, tables, schemas, charts, and structured outputs.
7. Sandboxed code/script execution.
8. API-first/headless access for downstream products.
9. Citations/source lineage where external or attached evidence is used.
10. Usage, latency, token, and cost telemetry.
11. Provider portability and configuration-driven routing.
12. Security boundaries that keep secrets out of Git and isolate tenant/project context.

## Phase 1 non-goals

The MVP does not need to:

- train a foundation model from scratch;
- match every feature of commercial general-purpose assistants;
- run a native 1-million-token model itself;
- become an EMR, clearinghouse, billing system, or clinical record system;
- execute irreversible healthcare transactions without domain-specific approval controls;
- vendor or fork large upstream frameworks without demonstrated need.

Large-context capability is a **routing capability**, not a hard-coded model-size promise. The system should expose the largest reliable context supported by the selected provider/model while using retrieval, project memory, summarization, and artifact persistence to extend practical working context.

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

A vertical product should inherit the Ananas core and add only what is domain-specific:

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
   ├── DIRT RCM
   ├── Continuara
   └── Future verticals
```

## MVP acceptance gates

Phase 1 is complete when a user can:

1. Open Ananas from a browser.
2. Start or resume a project conversation.
3. Attach files and ask questions grounded in them.
4. Invoke a tool/skill and see a concise execution status.
5. Generate and edit a persistent artifact beside chat.
6. Run a sandboxed coding/data task.
7. Route inference through the configured provider gateway without exposing provider credentials to the UI.
8. Inspect basic latency/token/cost telemetry.
9. Call the same core through an API.
10. Install a vertical pack without modifying the core reasoning/runtime architecture.

## Product hierarchy

| Layer | Purpose |
|---|---|
| Ananas Core | Reusable conversation, context, artifacts, tools, routing, execution, API, telemetry |
| Vertical Pack | Domain policy, skills, schemas, connectors, evaluations, workflow modules |
| Product Surface | Specialized user experience such as DIRT Reviewer Queue |
| Deployment | Codespaces for development; GCP for persistent/deployment workloads |

## Canonical Figma artifact

Design file: https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Pages:

- `00 — Product Architecture`
- `01 — Ananas Chat MVP`
- `02 — DIRT Reviewer Queue`
- `03 — No-PHI Data Contract`
