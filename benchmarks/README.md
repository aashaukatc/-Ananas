# Benchmarks

This directory contains reproducible evaluations of coding-agent/model performance.

## Current benchmark

[`nemotron-vs-frontier.md`](nemotron-vs-frontier.md) defines the initial Ananas brownfield coding benchmark for NVIDIA Nemotron against a frontier coding baseline.

It deliberately tests an existing FastAPI/PostgreSQL/Redis system with seeded concurrency and retry defects rather than relying on subjective greenfield code generation.

## Every benchmark run should record

- exact repository commit / fixture version
- exact task prompt
- model/provider identifier
- test and hidden-test results
- time to first passing patch
- total completion time
- human interventions
- token/API cost where available
- regressions introduced
- whether seeded defects were discovered without hints

## Result policy

Generated benchmark results belong under `benchmarks/results/` and are ignored by default until deliberately selected for publication.

Compare repeated runs using medians rather than publishing only the strongest run. A run with failing tests or an unresolved seeded defect is incomplete regardless of prose quality.
