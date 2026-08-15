# 🍍 Ananas Roadmap

This roadmap is the canonical phase-level plan for Ananas. Detailed execution state lives in GitHub Issues and the three GitHub Projects defined in [`docs/PROJECTS.md`](PROJECTS.md).

## Phase 0 — Repository Foundation — Complete

- [x] Public GitHub repository
- [x] Project README
- [x] Combined Python/Node/cloud `.gitignore`
- [x] Safe environment template
- [x] Codespaces Dev Container
- [x] Continue configuration template
- [x] Bootstrap and health-check scripts
- [x] Foundation CI workflow
- [x] Architecture and security documentation
- [x] Community Code of Conduct
- [x] Branded Issue templates
- [x] Initial Command Center web surface
- [x] Brand, motion, Figma and Canva manifests
- [x] Upstream integration registry

## Phase 1 — Reliable AI Coding Workspace — Active

### Completed foundation

- [x] Codespaces workspace validated with `scripts/healthcheck.sh`
- [x] Secret synchronization path for Continue established
- [x] NVIDIA and OpenRouter configuration points documented
- [x] Provider-neutral LiteLLM architecture established
- [x] Model-selection principle and benchmark adoption gate documented

### Remaining

- [ ] Replace/verify the NVIDIA Build API credential and pass a direct provider smoke test
- [ ] Configure the OpenRouter fallback credential
- [ ] Validate Continue → NVIDIA end to end
- [ ] Validate Continue → OpenRouter end to end
- [ ] Validate LiteLLM NVIDIA → OpenRouter failover
- [ ] Add repeatable provider smoke-test tooling
- [ ] Record latency, token usage, reliability and task-success metrics

## Phase 2 — Portable Agent Skills & MCP — Planned

### Completed foundation

- [x] Add upstream registry covering NVIDIA Skills, Microsoft Skills, MCP reference servers and NeMo Agent Toolkit
- [x] Define curated-install / reference-and-pin / evaluate-before-adoption policies

### Remaining

- [ ] Build upstream registry validation and sync tooling
- [ ] Add curated Agent Skills installation workflow
- [ ] Add MCP server configuration layer
- [ ] Add provenance, version and license checks
- [ ] Add compatibility tests for Continue + portable skills
- [ ] Publish the first Ananas Skills Bridge compatibility report

## Phase 3 — Reproducible Coding Benchmark Platform — Planned

### Completed foundation

- [x] Define brownfield benchmark protocol
- [x] Define correctness, autonomy, latency and cost dimensions
- [x] Define default model adoption gate

### Remaining

- [ ] Add executable brownfield benchmark fixture
- [ ] Seed known concurrency/idempotency/retry defects
- [ ] Add hidden tests
- [ ] Automate benchmark runs
- [ ] Capture time-to-first-passing-patch
- [ ] Capture human interventions
- [ ] Capture total inference cost
- [ ] Compare Nemotron against a frontier coding baseline
- [ ] Publish reproducible benchmark results

## Phase 4 — Autonomous Engineering Loop — Planned

- [ ] Define task intake schema
- [ ] Implement repository inspection stage
- [ ] Implement structured planning stage
- [ ] Implement plan → modify → test → review loop
- [ ] Add bounded retry policy
- [ ] Add rollback on validation failure
- [ ] Add model escalation for failed/high-risk tasks
- [ ] Add structured execution logs
- [ ] Add human approval gates for sensitive operations
- [ ] Surface task state in the Ananas Command Center

## Phase 5 — Google Cloud Deployment Layer — Planned

### Completed foundation

- [x] Add hardened GCE bootstrap script
- [x] Bind code-server and LiteLLM to localhost
- [x] Document SSH/IAP tunneling model
- [x] Keep remote AI inference decoupled from VM compute

### Remaining

- [ ] Confirm current Google Cloud student credit coverage
- [ ] Create dedicated Ananas GCP project
- [ ] Establish least-privilege IAM
- [ ] Define environment naming and resource labels
- [ ] Select deployment targets by workload
- [ ] Add infrastructure-as-code after requirements stabilize
- [ ] Add CI deployment gates
- [ ] Add budget alerts and shutdown controls

## Phase 6 — Observability & Cost Intelligence — Planned

- [ ] Define telemetry event schema
- [ ] Capture model/provider latency
- [ ] Capture token usage
- [ ] Capture inference cost
- [ ] Capture retries/fallback events
- [ ] Capture successful tasks per dollar
- [ ] Capture infrastructure consumption
- [ ] Add Command Center observability views
- [ ] Add budget/policy alerts

## Phase 7 — Production Security Hardening — Planned

### Completed foundation

- [x] Security policy documented
- [x] Secret-handling rules documented
- [x] Localhost-first service exposure documented

### Remaining

- [ ] Add secret scanning
- [ ] Add SAST
- [ ] Add dependency vulnerability scanning
- [ ] Add dependency/supply-chain policy checks
- [ ] Configure branch protection and required checks
- [ ] Define release/versioning strategy
- [ ] Define backup/recovery procedures
- [ ] Add operational runbooks
- [ ] Add agent permission and high-risk execution controls

## Phase 8 — Open-Source Ecosystem & Partnerships — Planned

- [ ] Establish Discussions categories and community operating cadence
- [ ] Publish contributor-ready good-first-issue backlog
- [ ] Publish compatibility and benchmark reports
- [ ] Contribute fixes upstream where Ananas discovers upstream defects
- [ ] Establish NVIDIA / Continue / MCP / Microsoft ecosystem collaboration targets
- [ ] Prepare partnership-ready technical evidence package
- [ ] Track external users, contributors and reproducible adoption signals

## Current Critical Path

1. Validate a correct NVIDIA Build API credential.
2. Configure OpenRouter fallback.
3. Prove direct provider → LiteLLM → Continue routing.
4. Instrument reliability, latency and cost.
5. Turn the benchmark specification into an executable fixture.
6. Begin portable Agent Skills + MCP interoperability work.
7. Introduce GCP persistence only when a workload requires it.

## Operating Rule

> **Stabilize first. Measure second. Automate third. Scale only after evidence.**
