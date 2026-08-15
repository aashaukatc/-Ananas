# Ananas Product Surface

## Product thesis

Ananas is a standalone conversational work engine. The Phase-1 interface should feel immediately understandable to users of modern assistants while remaining optimized for serious operational work: files, projects, tools, executable tasks, persistent artifacts, citations, and transparent cost/model routing.

The coding workspace remains an important Ananas capability, but it is no longer the definition of the product.

## Phase-1 primary surfaces

### 1. Conversation

The center of the product.

- multi-turn chat;
- file-grounded questions;
- source citations;
- tool/skill invocation;
- concise execution status;
- model/routing control where useful;
- approvals for sensitive actions.

### 2. Projects / Workspaces

Persistent working context for a business problem, client, product, research stream, or development task.

- conversations;
- files;
- artifacts;
- project instructions/policies;
- installed skills/connectors;
- relevant memory/context;
- activity and audit history.

### 3. Artifact / Canvas

A persistent side-by-side work surface for outputs that should live beyond a chat message.

Artifact types include:

- documents;
- code;
- tables;
- schemas;
- charts;
- plans/checklists;
- structured JSON/data outputs.

### 4. Execution

A transparent operational layer showing enough information to trust and control work without exposing raw private reasoning.

- tool/skill used;
- execution state;
- input/output artifact references;
- files/sources used;
- model route;
- latency;
- token/cost metrics;
- approvals/errors/retries.

### 5. Skills & Connectors

Installable capabilities with provenance, permissions, version/pin, and scope.

Core must not assume any one vendor's skill format. Use adapters where needed.

### 6. Models & Routing

- LiteLLM provider-neutral gateway;
- NVIDIA route as primary default;
- OpenRouter alternate/fallback;
- task-aware escalation/routing later;
- measured correctness, latency, and successful tasks per dollar.

### 7. API

The same reusable Ananas core must be callable headlessly so vertical products can use it without embedding the general-purpose UI.

## Product layout

```text
┌─────────────────┬────────────────────────────────────┬──────────────────────┐
│ Projects        │ Conversation                       │ Artifact / Canvas    │
│ Files           │                                    │                      │
│ Skills          │ User ↔ Ananas                      │ document / code /    │
│ Connectors      │                                    │ data / chart /      │
│ Models          │ Tool + source status               │ schema               │
│ Usage           │                                    │                      │
├─────────────────┴────────────────────────────────────┼──────────────────────┤
│ Execution / citations / route / token-cost / approvals / audit              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Vertical products

A vertical product extends Ananas through domain-owned modules rather than a fork of core.

```text
Ananas Core
   │
   ├── DIRT RCM
   │    ├── RCM data contracts
   │    ├── No-PHI boundary
   │    ├── RCM skills/policies
   │    ├── payer/EDI connectors
   │    ├── RCM eval suite
   │    └── reviewer-queue UI
   │
   ├── Continuara
   │    └── independent healthcare/care workflow pack
   │
   └── future verticals
```

## DIRT product surface

DIRT should not expose every Ananas control to an RCM operator. It should present a purpose-built wrapper:

- Executive revenue visibility
- Revenue leakage
- Denials
- AR aging
- EDI friction
- Human Reviewer Queue
- SOP/action detail
- Audit history
- Data/source status

The Ananas conversation can remain available as an analytical copilot inside DIRT, but RCM workflows should be structured rather than forcing every task through free-form chat.

## Frontend baseline

Current application baseline: Next.js + React + Tailwind. Continue to favor server-side boundaries for secrets and provider operations. Client-side code receives only the minimum data required for interaction.

## Backend baseline

- LiteLLM for provider routing;
- server-side provider credentials;
- sandbox boundary for execution;
- project/tenant context boundaries;
- artifact persistence;
- tool/skill permission model;
- API surface shared by Ananas UI and vertical products;
- telemetry for model route, latency, tokens, cost, errors, and outcome.

## Product non-goals for Phase 1

- training a new foundation model;
- reproducing every feature of ChatGPT or Claude;
- promising a fixed 1M-token native context window independent of providers;
- adopting a heavyweight multi-agent framework before benchmark justification;
- embedding healthcare-specific assumptions in Ananas core.

## Canonical design

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

See also:

- [`MVP.md`](MVP.md)
- [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md)
- [`UPSTREAMS.md`](UPSTREAMS.md)
- [`../design/FIGMA.md`](../design/FIGMA.md)
