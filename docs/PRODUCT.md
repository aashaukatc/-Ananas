# Ananas Product Surface

## Product thesis

Ananas is a standalone conversational work engine. The Phase-1 interface should feel immediately understandable to users of modern assistants while remaining optimized for serious operational work: projects, files, tools, executable tasks, persistent artifacts, source lineage, and transparent cost/model routing.

The coding/developer workspace remains an important Ananas capability, but it is **engineering infrastructure and one work mode**, not the definition of the product.

Phase-1 boundary: [`SCOPE.md`](SCOPE.md)  
Delivery gates: [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md)  
Functional MVP acceptance: [`MVP.md`](MVP.md)

## Current executable UI status

`app/` now follows the chat-first product grammar rather than the legacy Command Center grammar.

It is currently an **MVP shell / prototype-aligned scaffold**. The visible conversation, files, tools, artifact, routing, and delivery-status concepts must not be represented as completed backend capability until their MVP acceptance tests pass.

## Phase-1 primary surfaces

### 1. Conversation

The center of the product.

- multi-turn chat;
- file-grounded questions;
- source citations/lineage;
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

A transparent operational layer showing enough information to trust and control work without exposing private reasoning.

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

Core must not assume any one vendor's skill format. Use adapters where needed. Before building net-new capability, check the five canonical upstreams governed in [`UPSTREAMS.md`](UPSTREAMS.md).

### 6. Models & Routing

- LiteLLM provider-neutral gateway;
- NVIDIA route as primary default;
- OpenRouter alternate/fallback;
- task-aware escalation/routing later;
- measured correctness, latency, and successful tasks per dollar.

### 7. API

The same reusable Ananas core must be callable headlessly so vertical products can use it without embedding the general-purpose UI or duplicating business/runtime logic.

## Product layout

```text
┌─────────────────┬────────────────────────────────────┬──────────────────────┐
│ Projects        │ Conversation                       │ Artifact / Canvas    │
│ Files           │                                    │                      │
│ Skills          │ User ↔ Ananas                      │ document / code /    │
│ Connectors      │                                    │ data / chart /      │
│ Activity        │ Tool + source status               │ schema               │
│                 │                                    │                      │
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

A vertical may specialize UI and policy. It may not silently redefine core project, conversation, artifact, execution, provenance, routing, or isolation contracts.

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

Current application baseline: Next.js + React + Tailwind. Favor server-side boundaries for secrets and provider operations. Client-side code receives only the minimum data required for interaction.

The active editable prototype is indexed in [`../design/FIGMA.md`](../design/FIGMA.md).

## Backend baseline

- LiteLLM for provider routing;
- server-side provider credentials;
- sandbox boundary for execution;
- project/tenant context boundaries;
- file/source indexing and lineage;
- artifact persistence and revision history;
- tool/skill permission model;
- API surface shared by Ananas UI and vertical products;
- telemetry for model route, latency, tokens, cost, errors, fallback, and outcome.

## Product non-goals for Phase 1

The complete exclusion list lives in [`SCOPE.md`](SCOPE.md). Key examples:

- training a new foundation model;
- reproducing every feature of major assistants;
- promising a fixed 1M-token native context window independent of providers;
- native mobile apps and social login;
- billing/subscriptions in the initial free MVP;
- adopting a heavyweight multi-agent framework before benchmark justification;
- embedding healthcare-specific assumptions or PHI handling in Ananas Core.

## Canonical design

https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

See also:

- [`SCOPE.md`](SCOPE.md)
- [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md)
- [`MVP.md`](MVP.md)
- [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md)
- [`UPSTREAMS.md`](UPSTREAMS.md)
- [`../design/FIGMA.md`](../design/FIGMA.md)
