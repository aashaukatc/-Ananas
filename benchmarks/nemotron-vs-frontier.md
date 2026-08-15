# 🍍 Ananas — Coding Model Benchmark

## Objective
Compare NVIDIA Nemotron 3 Ultra against a frontier coding baseline using the exact same repository, prompt, tool permissions, test suite, and time budget.

## Recommended baseline
Use Claude Sonnet 5 as the contemporary baseline rather than Claude 3.5 Sonnet.

## Brownfield task
Start with a small FastAPI + PostgreSQL repository containing:
- `POST /v1/jobs` and `GET /v1/jobs/{id}`
- SQLAlchemy async persistence
- a Redis-backed worker
- pytest integration tests
- Docker Compose
- two deliberately seeded defects: duplicate job creation under concurrent requests and a retry loop that can process one job twice

Give each model this prompt verbatim:

> You are working in an existing production-style FastAPI repository. Inspect the repository before changing code. Fix the concurrency defects so POST /v1/jobs is idempotent for the same Idempotency-Key, a queued job can never be processed twice, and failed jobs retry with bounded exponential backoff. Preserve the existing public API. Add or improve tests proving the fixes under concurrency. Run the full test suite and lint checks. Do not declare success until all checks pass. Summarize the root cause, files changed, tests added, and any remaining risks.

## Scoring matrix (100 points)
- Functional correctness and hidden-test pass rate: 40
- Quality of tests, including concurrency coverage: 20
- Root-cause accuracy and architecture quality: 15
- Security/data-integrity behavior: 10
- Agent autonomy: commands/actions completed without human intervention: 10
- Efficiency: normalized latency + token/API cost: 5

## Metrics to capture
- First-token latency
- Time to first passing patch
- Total wall-clock completion time
- Input/output tokens
- API cost
- Number of tool calls
- Number of human interventions
- Tests passed / failed
- Regressions introduced
- Lines changed
- Whether the model found both seeded defects without hints

## Fair-run protocol
1. Reset the repository to the same Git commit before every run.
2. Use the same VM, dependency cache, network, prompt, and tool permissions.
3. Give each model one clean session; no cross-model context.
4. Run the same hidden test suite after the agent finishes.
5. Repeat each model three times and compare medians, not the best run.
6. Treat a run with failing tests or an unhandled race condition as incomplete regardless of prose quality.

## Go/no-go threshold for Ananas
Adopt Nemotron 3 Ultra as the default coding backbone if it reaches at least 90% of the baseline's correctness score while reducing inference cost by at least 60%, or if it beats the baseline on total successful tasks per dollar. Keep the baseline model only as an escalation path for failed/high-risk tasks.
