# 🍍 Ananas Cost Strategy

## Objective

Maximize **successful useful work per dollar** while preserving portability across development, infrastructure, model, and tool providers.

Engineering cost matters, but the product metric is broader than coding throughput: Ananas should measure whether a user task actually produced a useful, validated result.

## Allocation order

1. **GitHub Codespaces included capacity** for interactive development.
2. **Remote inference** so development/runtime control planes do not need GPUs by default.
3. **Free/promotional provider capacity** where quality, reliability, privacy, and terms are acceptable.
4. **Google Cloud credits** for persistence, deployment, databases, queues, storage, or integration workloads that Codespaces should not host.
5. **Paid compute/inference** only when task outcome, latency, context requirement, or operational reliability justifies it.

## What should run where

| Workload | Preferred location |
|---|---|
| Editing / Git / terminal | GitHub Codespaces |
| Local unit/integration tests | GitHub Codespaces / CI |
| Model inference | NVIDIA / OpenRouter remote APIs through the routing layer |
| CI | GitHub Actions |
| Persistent Ananas API/service | Google Cloud when MVP requires persistence/deployment |
| Persistent project/artifact/file storage | Google Cloud or selected managed service when required |
| Production-like integration testing | Google Cloud |
| GPU inference VM | Avoid by default; require benchmark justification |
| Source/product truth | GitHub |
| Prototype/design | Figma, linked back to GitHub specs |

## Task-level compute accounting

Every model-backed production task should eventually be attributable to:

- project/tenant;
- Ananas Core or vertical product;
- model/provider route;
- input/output tokens;
- latency/time-to-useful-result;
- retries/fallbacks;
- tool/execution cost where measurable;
- task outcome/evaluation;
- failure category.

Do not optimize raw token price without outcome quality.

## Spend controls

- Shut down idle Codespaces and non-required GCP resources.
- Do not provision GCP merely to duplicate included Codespaces capability.
- Avoid cloud GPUs unless a benchmark proves remote inference is inadequate.
- Track failed-task token burn separately from useful completions.
- Require explicit justification for always-on infrastructure.
- Set project/vertical budgets before pilot/beta scale.
- Use routing/fallback thresholds rather than sending every task to the most expensive model.
- Cache/reuse deterministic context or artifacts where safe instead of recomputing them repeatedly.
- Treat uncontrolled retry loops as defects.

## Decision metrics

Primary model/tool routing metric:

```text
successful evaluated tasks / total task cost
```

Supporting metrics:

```text
median cost per successful task
p95 latency per successful task
fallback rate
retry cost share
failed-task token burn
human interventions per completed task
```

Development/infrastructure efficiency:

```text
useful validated delivery / consumed cloud + API cost
```

For DIRT later, add vertical outcomes such as accepted reviewer signals, recovered revenue, false-positive/override rate, and cost per useful reviewed signal.

## Stage rule

- **PoC:** cost is recorded to expose bad architecture early; temporary inefficiency is acceptable.
- **Prototype:** avoid backend/inference spend unless needed for usability evidence.
- **MVP:** task-level telemetry is required.
- **Pilot/Beta:** enforce usage caps, cost alerts, and real unit-economics review before broader release.

The architecture should remain easy to move when pricing, quotas, student benefits, provider availability, or model quality changes.
