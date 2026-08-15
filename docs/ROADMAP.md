# 🍍 Ananas Roadmap

This roadmap is the canonical phase-level plan for Ananas. The product sequence is now explicit: **foundation → general-purpose conversational MVP → reusable capability layer → DIRT RCM vertical → additional verticals**.

## Phase 0 — Cloud-Native Engineering Foundation — Complete

- [x] Public GitHub repository
- [x] Codespaces Dev Container
- [x] Continue configuration
- [x] Node/Python baseline
- [x] Google Cloud persistent-workspace bootstrap
- [x] LiteLLM provider-neutral routing design
- [x] NVIDIA + OpenRouter configuration paths
- [x] Health checks and bootstrap automation
- [x] Security/contribution/community baseline
- [x] Initial web application surface
- [x] Model benchmark principles

This phase remains important infrastructure, but it is no longer treated as the product itself.

## Phase 1 — Ananas Conversational MVP — Active

Goal: deliver a useful home-grown conversational work assistant before specializing it into any one domain.

### Product contract — complete

- [x] Define Ananas as standalone core rather than an RCM/coding-only product
- [x] Define Phase-1 MVP and non-goals
- [x] Define core → vertical product contract
- [x] Create Figma Ananas chat/workspace wireframe
- [x] Establish Figma ↔ GitHub design governance

### Build

- [ ] Make conversation the primary application surface
- [ ] Add persistent projects/workspaces
- [ ] Add file upload + file-grounded context
- [ ] Add persistent artifact/canvas model
- [ ] Support document/code/table/schema/chart artifact types
- [ ] Add tool/skill invocation runtime
- [ ] Add concise execution-status events
- [ ] Add sandboxed code/data execution
- [ ] Add citations/source-lineage model
- [ ] Add project-level context/memory strategy
- [ ] Add reusable server-side Ananas API
- [ ] Add tenant/project isolation primitives before multi-user vertical deployment

### Provider/runtime validation

- [ ] Validate NVIDIA provider route end to end
- [ ] Validate OpenRouter alternate/fallback route
- [ ] Validate LiteLLM failover
- [ ] Add repeatable provider smoke tests
- [ ] Record latency, token usage, reliability, and task outcomes

### Phase-1 exit gate

A user can open Ananas in a browser, create/resume a project, converse over attached files, invoke tools, generate/edit persistent artifacts, execute a sandboxed task, inspect route/cost status, and access the same core through an API.

See [`MVP.md`](MVP.md).

## Phase 2 — Portable Skills, MCP & Capability Registry — Active/Planned

### Completed

- [x] Define four Tier-1 upstream repositories + one Tier-2 evaluation repository
- [x] Pin current upstream revisions in `config/upstreams.yaml`
- [x] Define no-wholesale-vendoring policy
- [x] Define benchmark gate for NeMo Agent Toolkit

### Remaining

- [ ] Build upstream registry validation/sync tooling
- [ ] Build curated skills installation workflow
- [ ] Add MCP configuration/adapter layer
- [ ] Record provenance, version, license, and permission scope for installed capabilities
- [ ] Add supply-chain checks before skill/tool promotion
- [ ] Add compatibility tests across Ananas tool adapters
- [ ] Keep provider/tool-specific APIs behind Ananas-owned interfaces

## Phase 3 — Artifact, Context & Knowledge Layer — Planned

- [ ] Define persistent artifact storage contract
- [ ] Define project file/source indexing contract
- [ ] Implement retrieval strategy
- [ ] Implement context compression/summarization
- [ ] Implement project memory boundaries
- [ ] Track source lineage into artifacts
- [ ] Support artifact revisions/version history
- [ ] Add export/share boundaries
- [ ] Add context-quality evaluations

**Rule:** practical long-context capability comes from routing + retrieval + persistent project state; do not bind product claims to a single model's advertised context window.

## Phase 4 — Execution, Agents & Automation — Planned

- [ ] Define task/execution schema
- [ ] Implement plan → tool/code → validate → artifact loop
- [ ] Add bounded retries and rollback
- [ ] Add approval gates for sensitive actions
- [ ] Add model escalation policy
- [ ] Add structured execution/audit logs
- [ ] Benchmark lightweight Ananas orchestration baseline
- [ ] Evaluate NVIDIA NeMo Agent Toolkit against that baseline
- [ ] Adopt only components that reduce owned complexity or improve successful tasks per dollar

## Phase 5 — Observability & Compute Economics — Planned

- [ ] Define telemetry event schema
- [ ] Capture model/provider route
- [ ] Capture latency and time-to-first-result
- [ ] Capture token consumption
- [ ] Capture provider/inference cost
- [ ] Capture retries/fallbacks
- [ ] Capture tool/execution failures
- [ ] Capture evaluated task outcome
- [ ] Compute successful tasks per dollar
- [ ] Add budget thresholds and route throttling/escalation policy
- [ ] Add user-visible usage/cost surface

## Phase 6 — DIRT RCM Vertical MVP — Planned, Design Defined

Goal: prove that Ananas can become a serious niche product without forking the core.

### Completed definition/design

- [x] Define DIRT as first Ananas vertical
- [x] Define audit-first / clarity-before-automation thesis
- [x] Define minimum No-PHI audit data contract
- [x] Define Human Reviewer Queue wireframe
- [x] Define evidence, confidence, SOP/action, reviewer disposition, and outcome loop
- [x] Define DIRT MVP non-goals

### Build

- [ ] Implement DIRT vertical-pack package/module boundary
- [ ] Implement No-PHI ingress validator with reject/quarantine path
- [ ] Map normalized claim/line data into `audit_claim` and `audit_claim_line`
- [ ] Implement `audit_signal` generation contract
- [ ] Implement `review_event` immutable audit contract
- [ ] Build AR/denial/EDI signal evaluation fixtures
- [ ] Build reviewer queue UI
- [ ] Build reviewer detail/evidence panel
- [ ] Build governed SOP/action recommendations
- [ ] Add multi-tenant data partitioning
- [ ] Add RCM-specific evaluation suite
- [ ] Complete privacy/security review before production de-identification claims

See [`DIRT_VERTICAL.md`](DIRT_VERTICAL.md).

## Phase 7 — DIRT Data-Platform Integration — Planned

Existing RCM/data work should be reused rather than rebuilt. Integration candidates are evaluated behind DIRT-owned adapters and data contracts.

- [ ] Inventory existing RCM repositories and determine canonical DIRT data repository
- [ ] Map existing intake/clean-room/warehouse assets to DIRT vertical interfaces
- [ ] Preserve lineage and QA controls already built
- [ ] Separate PHI-bearing source processing from the No-PHI intelligence boundary
- [ ] Add cloud-native deployment path where justified
- [ ] Avoid moving legacy implementation assumptions into Ananas core

## Phase 8 — Additional Vertical Products — Planned

- [ ] Define Continuara vertical contract
- [ ] Reuse Ananas core chat/artifacts/tools/API
- [ ] Add independent clinical/privacy/workflow controls appropriate to that product
- [ ] Add vertical-specific evaluations
- [ ] Prove second vertical can be launched without core fork
- [ ] Establish vertical-pack template/scaffolding

## Phase 9 — Production Platform Hardening — Planned

- [ ] Secret scanning
- [ ] SAST/dependency scanning
- [ ] supply-chain policy enforcement
- [ ] branch protection + required checks
- [ ] release/versioning strategy
- [ ] workload identity/OIDC where possible
- [ ] backup/recovery procedures
- [ ] operational runbooks
- [ ] tenant isolation tests
- [ ] rate/budget controls
- [ ] high-risk tool/action permission controls

## Phase 10 — Open-Source Ecosystem — Planned

- [ ] Publish compatibility reports
- [ ] Publish benchmark results
- [ ] Create contributor-ready issues
- [ ] Use GitHub Discussions for architecture/product RFCs when enabled
- [ ] Contribute reusable fixes upstream rather than maintaining unnecessary forks
- [ ] Track external adoption and contributions

## Current Critical Path

1. Finish the Phase-1 conversational shell around the existing web surface.
2. Implement persistent project/file/artifact contracts.
3. Validate NVIDIA/OpenRouter/LiteLLM routes.
4. Add tool/skill runtime and first curated upstream capabilities.
5. Add API + telemetry/cost accounting.
6. Build the DIRT vertical pack against the shared core.
7. Connect existing RCM data assets through a defined DIRT adapter instead of rewriting them.

## Operating Rule

> **Build one reusable core. Measure it. Specialize through vertical packs. Reuse upstream capability before owning more code.**
