# 🍍 Ananas GitHub Projects Operating System

This document is the canonical operating model for the three Ananas GitHub Projects. GitHub remains the source of truth for work items; these projects provide three different planning lenses over that work.

## 1. 🍍 Ananas — Engineering Registry

**Purpose:** canonical inventory of all actionable engineering work.

**Primary layout:** Table

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Inbox, Triage, Ready, In Progress, Blocked, Review, Done |
| Priority | Single select | P0 Critical, P1 High, P2 Medium, P3 Low |
| Area | Multi select | Command Center, Codespaces, GCP, Continue, LiteLLM, NVIDIA, OpenRouter, Agent Skills, MCP, Benchmarks, CI/CD, Security, Docs, Community, Brand / UX |
| Category | Single select | Bug, Feature, Infrastructure, Security, Documentation, Research, Benchmark, Integration, Technical Debt, Community |
| Effort | Single select | XS, S, M, L, XL |
| Risk | Single select | Low, Medium, High, Critical |
| Target Release | Single select | Unscheduled, Next, Upcoming, Future |
| Upstream | Single select | None, Investigate, Reuse, Contribute, Fork |
| Assignees | GitHub built-in | GitHub users |

### Views

1. **Registry** — Table; group by Status; sort Priority ascending then Updated descending.
2. **Triage Queue** — Table; filter `Status:Inbox,Triage`; sort Priority.
3. **High Risk** — Table; filter `Risk:High,Critical` or `Priority:P0 Critical,P1 High`.
4. **Upstream Work** — Table; filter `Upstream:Investigate,Reuse,Contribute,Fork`.
5. **Recently Done** — Table; filter `Status:Done`; sort Updated descending.

### Automation

- Auto-add every repository Issue and Pull Request to this project.
- New items default to `Status = Inbox`.
- Closed Issues / merged Pull Requests move to `Done` where feasible.

---

## 2. ⚡ Ananas — Execution Board

**Purpose:** only work that has been deliberately selected for active delivery.

**Primary layout:** Board

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Ready, In Progress, Blocked, Review, Done |
| Priority | Single select | Critical, High, Normal, Low |
| Effort | Single select | Quick, Small, Medium, Large |
| Iteration | Iteration | Two-week iterations |
| Due Date | Date | Manual date |
| Blocker Type | Single select | None, Dependency, Access/Credentials, Upstream, Infrastructure, Decision, Security |
| Execution Mode | Single select | Human, Agent-assisted, Autonomous, Hybrid |
| Validation | Single select | Not Started, Testing, CI Passing, Manual Review, Validated |
| Assignees | GitHub built-in | GitHub users |

### Views

1. **Active Delivery** — Board grouped by Status.
2. **Current Iteration** — Board filtered to current iteration.
3. **Blocked** — Table filtered to `Status:Blocked`, showing Blocker Type and Due Date.
4. **Validation Queue** — Table filtered to `Status:Review` or `Validation:Testing,CI Passing,Manual Review`.
5. **My Work** — Board filtered to the current assignee.

### Operating rules

- Do not bulk-import the repository backlog.
- Add only execution-ready work.
- Keep work-in-progress intentionally small.
- Every `Done` item must have validation evidence.
- A blocked autonomous task must retry safely, diagnose, escalate, or stop; it must not loop indefinitely.

---

## 3. 🗺️ Ananas — Product & Platform Roadmap

**Purpose:** strategic timeline for platform phases, major capabilities, releases, partnerships, and milestone-level outcomes.

**Primary layout:** Roadmap

### Fields

| Field | Type | Options |
|---|---|---|
| Status | Single select | Planned, Active, At Risk, Blocked, Complete |
| Phase | Single select | Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6, Phase 7, Phase 8 |
| Strategic Area | Multi select | AI / Models, Agent Platform, Developer Experience, Cloud Infrastructure, Product UI, Security, Benchmarks, Open Source, Community, Partnerships |
| Start Date | Date | Manual date |
| Target Date | Date | Manual date |
| Confidence | Single select | High, Medium, Low |
| Progress | Number | 0–100 |
| Impact | Single select | Transformational, High, Medium, Low |
| Dependency | Multi select | Models, Skills/MCP, GCP, GitHub, Security, UI, Benchmarking, Community |
| Milestone Type | Single select | Platform, Product, Infrastructure, Security, Community, Partnership, Release |
| Assignees | GitHub built-in | GitHub users |

### Views

1. **Strategic Roadmap** — Roadmap using Start Date and Target Date; group by Phase.
2. **Current Phase** — Table filtered to `Status:Active,At Risk,Blocked`.
3. **At Risk** — Table filtered to `Status:At Risk,Blocked` or `Confidence:Low`.
4. **By Strategic Area** — Roadmap grouped by Strategic Area.
5. **Completed Milestones** — Table filtered to `Status:Complete`.

### Initial phases

1. Phase 1 — Reliable AI Coding Workspace
2. Phase 2 — Portable Agent Skills & MCP
3. Phase 3 — Reproducible Coding Benchmark Platform
4. Phase 4 — Autonomous Engineering Loop
5. Phase 5 — Google Cloud Deployment Layer
6. Phase 6 — Observability & Cost Intelligence
7. Phase 7 — Production Security Hardening
8. Phase 8 — Open-Source Ecosystem & Partnerships

---

## Routing Rules

```text
Repository Issue / PR
        ↓
🍍 Engineering Registry
        │
        ├── selected for delivery ──► ⚡ Execution Board
        │
        └── strategic / epic work ──► 🗺️ Product & Platform Roadmap
```

One issue may appear in more than one project only when the additional project provides a genuinely different management lens.

## Source-of-truth rule

- GitHub Issue / Pull Request = work-item truth.
- Repository documentation = architecture and policy truth.
- GitHub Project fields = planning state.
- Project views = presentation, not a second source of truth.

## Maintenance cadence

- **Daily while actively developing:** clear Inbox/Triage, update blockers, move execution status.
- **Weekly:** review priorities, stale work, current iteration, roadmap risks.
- **At every merge:** close or update the linked Issue and record validation evidence.
- **Monthly:** review roadmap confidence, upstream dependencies, cost, security and release readiness.
