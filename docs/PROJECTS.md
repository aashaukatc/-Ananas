# 🍍 Ananas GitHub Projects Operating System

GitHub remains the source of truth for work items. Project views are planning lenses, not parallel specifications.

Every actionable item should be classifiable by:

- **Product:** Ananas Core, DIRT, Continuara, Shared Infrastructure, Ecosystem
- **Delivery Stage:** Scope, PoC, Prototype, MVP, Pilot/Beta, Post-MVP
- **Area:** Conversation, Projects, Files/Context, Artifacts, Tools/Skills, Execution, API, Models/Routing, Telemetry, Security, UX, Vertical Pack, Cloud/DevEx

See [`DELIVERY_LIFECYCLE.md`](DELIVERY_LIFECYCLE.md) for the evidence required to move between stages.

## 1. 🍍 Engineering Registry

**Purpose:** canonical inventory of engineering/product work.

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Inbox, Triage, Ready, In Progress, Blocked, Review, Done |
| Priority | Single select | P0 Critical, P1 High, P2 Medium, P3 Low |
| Product | Single select | Ananas Core, DIRT, Continuara, Shared Infrastructure, Ecosystem |
| Delivery Stage | Single select | Scope, PoC, Prototype, MVP, Pilot/Beta, Post-MVP |
| Area | Multi select | Conversation, Projects, Files/Context, Artifacts, Tools/Skills, Execution, API, Models/Routing, Telemetry, Security, UX, Vertical Pack, Cloud/DevEx |
| Category | Single select | Bug, Feature, Infrastructure, Security, Documentation, Research, Benchmark, Integration, Technical Debt, Community |
| Effort | Single select | XS, S, M, L, XL |
| Risk | Single select | Low, Medium, High, Critical |
| Upstream | Single select | None, Inspect, Reuse, Adapt, Contribute, Evaluate-Tier2 |
| Evidence | Text | Test, benchmark, Figma, log, ADR, or other validation reference |

### Views

1. **Registry** — all work grouped by Status.
2. **Current MVP** — Product `Ananas Core`, Delivery Stage `MVP`.
3. **PoC Risks** — Delivery Stage `PoC`, grouped by Area.
4. **Prototype / UX** — Delivery Stage `Prototype`.
5. **DIRT** — Product `DIRT`.
6. **Upstream Reuse** — Upstream != `None`.
7. **High Risk** — Risk `High/Critical` or Priority `P0/P1`.

## 2. ⚡ Execution Board

**Purpose:** only work deliberately selected for active delivery.

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Ready, In Progress, Blocked, Review, Done |
| Priority | Single select | Critical, High, Normal, Low |
| Product | Single select | Ananas Core, DIRT, Continuara, Shared Infrastructure, Ecosystem |
| Delivery Stage | Single select | Scope, PoC, Prototype, MVP, Pilot/Beta, Post-MVP |
| Effort | Single select | Quick, Small, Medium, Large |
| Iteration | Iteration | short execution cycle |
| Blocker Type | Single select | None, Dependency, Access/Credentials, Upstream, Infrastructure, Decision, Security, UX |
| Execution Mode | Single select | Human, Agent-assisted, Autonomous, Hybrid |
| Validation | Single select | Not Started, Testing, CI Passing, UX Review, Security Review, Validated |
| Evidence | Text | link/reference to validation |

### Operating rules

- Keep work-in-progress intentionally small.
- Do not move an item to `Done` because code exists; attach validation evidence.
- PoC items are done when the risk question is answered, even if the experiment is discarded.
- Prototype items are done when the intended user flow is testable/reviewed, not when backend code is connected.
- MVP items are done only when production-path acceptance criteria pass.
- A blocked autonomous task must retry safely, diagnose, escalate, or stop; it must not loop indefinitely.

## 3. 🗺️ Product & Platform Roadmap

**Purpose:** strategic timeline for product stages, platform capabilities, vertical releases, and production hardening.

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Planned, Active, At Risk, Blocked, Complete |
| Roadmap Phase | Single select | Phase 0–10 from `docs/ROADMAP.md` |
| Product | Single select | Ananas Core, DIRT, Continuara, Shared Infrastructure, Ecosystem |
| Delivery Stage | Single select | Scope, PoC, Prototype, MVP, Pilot/Beta, Post-MVP |
| Strategic Area | Multi select | Product, AI/Models, Agent/Tool Platform, Data/Context, Cloud Infrastructure, Security, UX, Benchmarks, Open Source, Community |
| Confidence | Single select | High, Medium, Low |
| Progress | Number | 0–100 |
| Impact | Single select | Transformational, High, Medium, Low |
| Dependency | Multi select | Projects/Files, Artifacts, Skills/MCP, Providers, GCP, Security, UX, RCM Data Platform, Benchmarking |

### Canonical roadmap phases

1. Phase 0 — Cloud-Native Engineering Foundation
2. Phase 1 — Ananas Conversational MVP
3. Phase 2 — Portable Skills, MCP & Capability Registry
4. Phase 3 — Artifact, Context & Knowledge Layer
5. Phase 4 — Execution, Agents & Automation
6. Phase 5 — Observability & Compute Economics
7. Phase 6 — DIRT RCM Vertical MVP
8. Phase 7 — DIRT Data-Platform Integration
9. Phase 8 — Additional Vertical Products
10. Phase 9 — Production Platform Hardening
11. Phase 10 — Open-Source Ecosystem

`docs/ROADMAP.md` is the canonical phase definition; project views must not rename phases independently.

## Routing rules

```text
Issue / PR
   ↓
Engineering Registry
   │
   ├── selected now ──► Execution Board
   │
   └── strategic milestone ──► Product & Platform Roadmap
```

One Issue may appear in multiple projects only when each view adds a genuinely different management lens.

## Evidence rule

Delivery Stage and Status are separate:

- `Delivery Stage = PoC`, `Status = Done` means the technical question was answered.
- `Delivery Stage = Prototype`, `Status = Done` means the UX prototype passed its review gate.
- `Delivery Stage = MVP`, `Status = Done` means the real product requirement passed its MVP acceptance evidence.

Never infer MVP completion from a completed PoC or polished prototype.

## Source-of-truth hierarchy

1. GitHub Issue / Pull Request — work-item truth.
2. `docs/SCOPE.md` — Phase-1 boundary truth.
3. `docs/DELIVERY_LIFECYCLE.md` — stage-gate truth.
4. `docs/ROADMAP.md` — phase sequencing truth.
5. `docs/MVP.md` — MVP acceptance truth.
6. Figma — prototype/design truth.
7. GitHub Project fields/views — planning state only.

## Maintenance cadence

- **During active delivery:** update blockers/status/evidence as work changes.
- **Weekly:** review scope pressure, PoC risks, prototype feedback, MVP blockers, stale upstream decisions, and compute cost.
- **At every merge:** update/close linked Issues and attach validation evidence.
- **At stage transitions:** verify the corresponding exit gate before changing `Delivery Stage`.
