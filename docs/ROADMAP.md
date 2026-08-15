# 🍍 Ananas Roadmap

This roadmap is the canonical phase-level sequence for Ananas. Product delivery stages are controlled separately by [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md): **Scope → PoC → Prototype → MVP → Pilot/Beta**.

The architecture sequence is:

**cloud foundation → conversational core → reusable capabilities/context/execution → measured economics → DIRT vertical → reuse existing RCM data assets → additional verticals → production hardening → ecosystem**.

## Delivery-gate overlay

| Gate | Current state | Roadmap relationship |
|---|---|---|
| Scope | Defined | Phase-1 boundary frozen in `SCOPE.md` |
| Proof of Concept | Active / partial | Critical technical risks across Phases 1–4 |
| Prototype | Visual prototype built; interaction validation pending | Active Figma product surfaces for Core + DIRT |
| MVP | Not yet achieved | Core MVP exits Phase 1 only when `MVP.md` gates pass |
| Pilot/Beta | Not started | Begins after MVP + required production/security hardening for the target audience |

Roadmap phase completion does not automatically equal a delivery-stage transition. Evidence rules live in the lifecycle document.

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

This phase remains important infrastructure, but it is **not the product itself**.

## Phase 1 — Ananas Conversational MVP — Active

Goal: deliver a useful home-grown conversational work assistant before specializing it into any one domain.

### Scope/product contract — complete

- [x] Define Ananas as standalone core rather than an RCM/coding-only product
- [x] Define Phase-1 inclusions/exclusions
- [x] Define Scope → PoC → Prototype → MVP → Pilot/Beta gates
- [x] Define core → vertical product contract
- [x] Create Figma product architecture
- [x] Create Figma Ananas chat/workspace wireframe
- [x] Create Figma lifecycle/scope board
- [x] Establish Figma ↔ GitHub design governance
- [x] Replace legacy engineering-dashboard product framing with chat-first app shell

### Build

- [ ] Implement real session/user identity for the supported release audience
- [ ] Implement multi-turn conversation persistence
- [ ] Add persistent projects/workspaces
- [ ] Add file upload/indexing + file-grounded context
- [ ] Add source-lineage model
- [ ] Add persistent artifact/canvas model
- [ ] Support document/code/table/schema/chart/structured-data artifacts
- [ ] Add artifact reopen/revision behavior
- [ ] Add tool/skill invocation runtime
- [ ] Add concise execution/provenance status events
- [ ] Add sandboxed code/data execution
- [ ] Add project-level context/memory strategy
- [ ] Add reusable server-side Ananas API
- [ ] Add project/tenant isolation primitives before multi-user vertical deployment

### Provider/runtime PoCs

- [ ] Validate NVIDIA provider route end to end
- [ ] Validate OpenRouter alternate/fallback route
- [ ] Validate LiteLLM failover
- [ ] Add repeatable provider smoke tests
- [ ] Record latency, token usage, reliability, and task outcomes

### Phase-1 / MVP exit gate

Phase 1 is not complete because the UI shell exists. It exits only when every acceptance gate in [`MVP.md`](MVP.md) passes from a clean supported deployment path.

## Phase 2 — Portable Skills, MCP & Capability Registry — Active / Planned

### Completed foundation

- [x] Define four Tier-1 upstream repositories + one Tier-2 evaluation repository
- [x] Pin reviewed upstream revisions in `config/upstreams.yaml`
- [x] Define no-wholesale-vendoring policy
- [x] Add registry CI validation
- [x] Add reproducible pinned-source fetch into Git-ignored `.ananas/upstreams/`
- [x] Define benchmark gate for NeMo Agent Toolkit

### Remaining

- [ ] Build curated skills installation workflow
- [ ] Add MCP configuration/adapter layer
- [ ] Record provenance, version, license, and permission scope for installed capabilities
- [ ] Add supply-chain checks before skill/tool promotion
- [ ] Add compatibility tests across Ananas tool adapters
- [ ] Keep provider/tool-specific APIs behind Ananas-owned interfaces
- [ ] Establish update workflow that reviews diffs before changing pins

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
- [x] Build editable Human Reviewer Queue wireframe
- [x] Build editable No-PHI data-contract board
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
- [ ] Avoid moving legacy implementation assumptions into Ananas Core

The current `aashaukatc/rcm-data-platform` assessment is tracked separately so existing work is reused rather than rewritten blindly.

## Phase 8 — Additional Vertical Products — Planned

- [ ] Define Continuara vertical contract
- [ ] Reuse Ananas Core chat/artifacts/tools/API
- [ ] Add independent clinical/privacy/workflow controls appropriate to that product
- [ ] Add vertical-specific evaluations
- [ ] Prove second vertical can launch without a core fork
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

## Current critical path

1. Complete the provider-routing PoC and repeatable smoke tests.
2. Implement real project/session persistence and isolation.
3. Implement file-grounded context + source lineage.
4. Implement artifact persistence/revision.
5. Integrate the first curated Tier-1 tool/skill behind an Ananas adapter.
6. Implement sandbox + API parity.
7. Instrument reliability/token/cost/outcome telemetry.
8. Pass the Core MVP acceptance gates.
9. Then move DIRT from design-defined into vertical build while reusing existing RCM data assets.

## Operating rule

> **Freeze scope. Prove risky assumptions. Validate the UX. Build the smallest real product. Pilot with evidence. Reuse upstream and existing project assets before owning more code.**
