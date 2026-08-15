# Benchmarks

This directory contains reproducible evaluations of coding-agent/model performance.

Benchmarks should record:

- exact repository commit / fixture version
- exact task prompt
- model/provider identifier
- test and hidden-test results
- time to first passing patch
- total completion time
- human interventions
- token/API cost where available
- regressions introduced

Generated benchmark results belong under `benchmarks/results/` and are ignored by default until deliberately selected for publication.
