# 🍍 Ananas Cost Strategy

## Objective

Maximize successful engineering work per dollar while preserving portability across development and model providers.

## Allocation Order

1. **GitHub Codespaces included capacity** for interactive development.
2. **Remote inference** so the development environment does not need a GPU.
3. **Free/promotional provider capacity** where reliability and terms are acceptable.
4. **Google Cloud credits** for deployment and persistent services that Codespaces should not host.
5. **Paid compute/inference** only when task success, latency, or operational reliability justifies it.

## What Should Run Where

| Workload | Preferred location |
|---|---|
| Editing / Git / terminal | GitHub Codespaces |
| Local unit tests | GitHub Codespaces |
| AI inference | NVIDIA / OpenRouter remote APIs |
| CI | GitHub Actions |
| Persistent API/service | Google Cloud |
| Persistent database/storage | Google Cloud when required |
| GPU inference VM | Avoid by default |
| Source of truth | GitHub |

## Spend Controls

- Shut down idle Codespaces.
- Do not provision a GCP VM merely to host the editor while Codespaces capacity is available.
- Avoid cloud GPUs unless a benchmark proves remote inference is inadequate.
- Track model success rate together with token/API cost; cheapest tokens are not useful if tasks repeatedly fail.
- Prefer stateless/disposable development environments.
- Require an explicit reason before adding always-on infrastructure.

## Decision Metric

For model/provider choices, optimize:

```text
successful engineering tasks / total inference cost
```

while enforcing minimum correctness and reliability thresholds.

For infrastructure choices, optimize:

```text
useful developer hours / consumed cloud credit
```

The architecture should remain easy to move when pricing, quotas, student benefits, or provider availability change.
