# 🍍 Ananas Delivery Lifecycle

Ananas uses explicit stage gates so technical experiments, design prototypes, MVP code, and pilot releases are not confused with one another.

```text
Scope → Proof of Concept → Prototype → MVP → Pilot / Beta → broader release
```

A later stage may begin while lower-risk work from the previous stage is still being closed, but **no stage may be declared complete without its exit evidence**.

## Current state

| Stage | Current status | Evidence |
|---|---|---|
| Scope | **Defined** | `docs/SCOPE.md`, `docs/MVP.md`, roadmap, Figma scope board |
| Proof of Concept | **Active / partial** | Codespaces/GCP foundation exists; provider and product-path PoCs still need end-to-end evidence |
| Prototype | **Visual prototype built; interaction validation pending** | Active Figma file contains Chat MVP, DIRT Queue, No-PHI contract and lifecycle frames |
| MVP | **Not yet achieved** | Execution backlog is open; product backend/persistence/tooling/API gates remain |
| Pilot / Beta | **Not started** | Begins only after MVP release-candidate gate passes |

## 1. Scope gate

### Purpose
Prevent feature creep and create a shared agreement on what Phase 1 is and is not.

### Required artifacts
- `docs/SCOPE.md`
- `docs/MVP.md`
- `docs/ROADMAP.md`
- canonical Figma product/prototype file
- explicit upstream dependency registry
- explicit non-goals/exclusions

### Exit criteria
- problem and target user are defined;
- Phase-1 inclusions and exclusions are unambiguous;
- vertical/core responsibility boundary is explicit;
- major dependencies and reuse policy are documented;
- MVP acceptance gates are testable;
- new feature requests can be classified without interpretation drift.

## 2. Proof of Concept (PoC) gate

### Purpose
Prove the risky technical assumptions before polishing or scaling them.

A PoC may use hard-coded data, local fixtures, throwaway adapters, and minimal UI. It is evidence, not production architecture.

### Ananas PoC set

| PoC | Question to prove | Required evidence |
|---|---|---|
| Provider route | Can Ananas route a real request through LiteLLM to NVIDIA and fail over/alternate to OpenRouter? | repeatable smoke test, route logs, failure/fallback result |
| Project persistence | Can a project be created, stored, resumed, and isolated from another project? | persistence fixture + isolation test |
| File grounding | Can a source file be indexed/retrieved and cited without losing lineage? | fixture, grounded answer, source refs |
| Artifact persistence | Can an artifact be created from chat, reopened, edited, and versioned independently of message rendering? | create/reopen/revision test |
| Tool/skill execution | Can a governed skill/tool execute with explicit permission/provenance and bounded output? | selected Tier-1 capability + trace |
| Sandbox | Can code/data execution run without exposing host/provider secrets or uncontrolled filesystem/network access? | security fixture + expected denial behavior |
| API parity | Can the same core task be invoked without the web UI? | API fixture returning equivalent structured result |
| Upstream adapter | Can an approved upstream capability be fetched at its exact pin and exposed behind an Ananas-owned adapter? | pinned fetch + adapter test |

### PoC rules
- do not optimize visual design;
- do not invent generalized frameworks before the first risk is proven;
- reuse upstream implementations first where appropriate;
- throw away PoC code when productionizing it is more expensive than rewriting a clean interface;
- record negative results: a failed PoC is useful if it kills a bad architecture early.

### Exit criteria
Every critical MVP technical risk has a reproducible pass/fail result and no unresolved architecture blocker remains hidden behind a mock.

## 3. Prototype gate

### Purpose
Validate usability, information architecture, and product flow before backend coupling makes UI changes expensive.

### Canonical prototype
https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ

Current editable surfaces:

1. `00 — Product Architecture`
2. `01 — Ananas Chat MVP`
3. `02 — DIRT Reviewer Queue`
4. `03 — No-PHI Data Contract`
5. `04 — Delivery Lifecycle & Scope`

### Prototype rules
- fake/synthetic data only;
- no claim that a visible control is backed by production behavior;
- prioritize the real core workflow over marketing pages;
- test the chat + project + artifact composition first;
- test DIRT as a specialized vertical surface without changing core navigation contracts.

### Prototype exit criteria
- primary user flows are wired or walkthrough-testable;
- no critical navigation or information-hierarchy ambiguity remains;
- the prototype clearly separates core Ananas from a vertical such as DIRT;
- design feedback is recorded before implementation decisions are locked;
- implementation can be derived without inventing missing major screens.

## 4. Minimum Viable Product (MVP) gate

### Purpose
Ship the smallest **real working product** that proves Ananas is useful outside a design/demo environment and can support a vertical without forking core.

### Ananas-specific MVP definition
The initial Ananas MVP is intentionally **free**. Therefore a payment gateway is **not** an MVP acceptance requirement. Billing/subscriptions become a separate commercialization decision later rather than forcing payment infrastructure into a product whose current thesis is open, low-cost, reusable capability.

### Required MVP capabilities
- real user/session identity appropriate to the release audience;
- persistent projects/workspaces;
- multi-turn chat;
- project files and grounded retrieval;
- source lineage;
- persistent editable artifacts;
- governed tool/skill invocation;
- sandboxed execution;
- provider-neutral routing;
- server-side secrets;
- API access;
- basic telemetry and error handling;
- project/tenant isolation primitives;
- tested install/use path for at least one vertical pack without core fork.

### MVP exclusions still apply
See [`SCOPE.md`](SCOPE.md). MVP does not absorb every future capability simply because it is technically possible.

### MVP release-candidate exit criteria
- all `docs/MVP.md` acceptance gates pass;
- CI/build/tests pass from a clean checkout;
- no critical security issue is open;
- provider failure behavior is tested;
- data/project isolation tests pass;
- no prototype-only fake capability is represented as working product behavior;
- operating and recovery instructions are documented;
- an MVP user can complete the core workflow without developer intervention.

## 5. Pilot / Beta gate

### Purpose
Expose the stable MVP to a limited group so hidden bugs, onboarding friction, real usage patterns, cost behavior, and scale limits are measured before broader release.

### Audience
- founder/operator use in real projects;
- trusted design partners;
- selected DIRT RCM pilot users after privacy/security gates pass;
- contributors testing supported deployment paths.

### Pilot controls
- limited access;
- intensive logging/telemetry;
- explicit feedback path;
- incident and rollback procedure;
- usage/cost caps;
- release notes and known limitations;
- no silent expansion of data permissions;
- production-like backup/recovery for persisted work.

### Pilot metrics
- activation/completion of the core workflow;
- task success rate;
- user intervention rate;
- latency/time to useful result;
- model/tool error rate;
- fallback rate;
- token/cost per successful task;
- artifact reopen/reuse rate;
- retention/return-to-project behavior;
- support incidents and severity;
- DIRT reviewer signal acceptance/override/recovery outcomes where applicable.

### Exit criteria
A broader release is considered only when reliability, security, usability, unit economics, and user feedback meet explicit targets set from real pilot data.

## Stage control rule

Every Issue and roadmap item should carry or state its **Delivery Stage**:

`Scope`, `PoC`, `Prototype`, `MVP`, `Pilot/Beta`, or `Post-MVP`.

A feature cannot move stages merely because code exists. Stage movement requires the evidence defined above.
