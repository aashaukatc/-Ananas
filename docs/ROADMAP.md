# 🍍 Ananas Roadmap

## Phase 0 — Repository Foundation

- [x] Public GitHub repository
- [x] Project README
- [x] Combined Python/Node/cloud `.gitignore`
- [x] Safe environment template
- [x] Codespaces Dev Container
- [x] Continue configuration template
- [x] Bootstrap and health-check scripts
- [x] Foundation CI workflow
- [x] Architecture and security documentation

## Phase 1 — AI Coding Workspace

- [ ] Configure NVIDIA API credential as a Codespaces secret
- [ ] Configure OpenRouter API credential as a Codespaces secret
- [ ] Validate Continue → NVIDIA inference
- [ ] Validate Continue → OpenRouter inference
- [ ] Establish model-selection and escalation policy
- [ ] Record latency, token usage, and task success metrics

## Phase 2 — Reproducible Agent Benchmark

- [ ] Add controlled brownfield coding benchmark
- [ ] Seed known defects and hidden tests
- [ ] Compare Nemotron against a frontier coding baseline
- [ ] Capture time-to-first-passing-patch
- [ ] Capture human interventions and total cost
- [ ] Define go/no-go thresholds for default model selection

## Phase 3 — Google Cloud Deployment Layer

- [ ] Confirm available student/cloud credits
- [ ] Create a dedicated Ananas GCP project
- [ ] Establish least-privilege IAM
- [ ] Select low-cost deployment targets per workload
- [ ] Add infrastructure-as-code only after requirements stabilize
- [ ] Add CI deployment gates

## Phase 4 — Autonomous Engineering Loop

- [ ] Issue/task intake
- [ ] Repository inspection
- [ ] Plan → modify → test → review loop
- [ ] Automatic rollback on validation failure
- [ ] Model escalation on failed/high-risk tasks
- [ ] Cost and token auditing
- [ ] Structured execution logs

## Phase 5 — Production Hardening

- [ ] Dependency and supply-chain controls
- [ ] Secret scanning
- [ ] SAST and dependency vulnerability scanning
- [ ] Branch protection and required checks
- [ ] Release/versioning strategy
- [ ] Backup/recovery procedures
- [ ] Operational runbooks

## Current Next Action

Create the first Codespace from `main`, allow the Dev Container initialization to complete, then run:

```bash
bash scripts/healthcheck.sh
```

Do not add provider API keys directly to repository files.
