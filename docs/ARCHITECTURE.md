# 🍍 Ananas Architecture

## 1. Purpose

Ananas is a cloud-native autonomous software-engineering workspace designed to maximize useful coding capability while minimizing local-hardware and cloud-GPU requirements.

The repository is the durable control plane. Development environments may be disposable; source, configuration templates, documentation, benchmarks, and automation remain in GitHub.

## 2. Logical Architecture

```text
Developer
   │
   ▼
Browser / VS Code client
   │
   ▼
GitHub Codespaces
   │
   ├── Git + GitHub
   ├── Node.js / Python
   ├── Continue
   ├── tests / linters / build tools
   │
   ├──────────► NVIDIA Nemotron
   │             primary AI inference
   │
   ├──────────► OpenRouter
   │             alternate/fallback provider
   │
   └──────────► Google Cloud
                 deployment and persistent workloads
```

## 3. Responsibility Boundaries

### GitHub

- Source of truth
- Repository governance
- Codespaces configuration
- CI/CD
- Documentation
- Benchmark definitions and results

### GitHub Codespaces

- Primary interactive development environment
- Disposable compute
- VS Code extensions
- Build/test execution
- No dedicated GPU requirement

### Continue

- IDE-facing AI coding layer
- Chat/edit/apply workflows
- Provider abstraction at the developer interface

### NVIDIA Nemotron

- Primary remote reasoning/coding model route
- Heavy inference remains outside the development VM/container

### OpenRouter

- Alternate model/provider route
- Provides flexibility when the primary provider is unavailable, constrained, or unsuitable

### Google Cloud

- Persistent services
- Integration and deployment targets
- Production-like validation
- Cloud infrastructure only when a workload requires it

## 4. Security Model

1. Repository contains templates, never production credentials.
2. API keys are injected at runtime using Codespaces secrets/environment variables.
3. Google Cloud credentials use least privilege and should prefer workload identity/OIDC over long-lived keys as the platform matures.
4. Public Git history is assumed permanent.
5. CI operates with read-only repository permissions unless a workflow explicitly requires more.

## 5. Cost Model

Resource allocation follows this order:

1. Included GitHub/Codespaces capacity
2. Free or promotional inference capacity where appropriate
3. Google Cloud student/credit-backed infrastructure for workloads requiring persistence or deployment
4. Paid inference/compute only when justified by task success, latency, or reliability

## 6. Planned Evolution

The initial repository intentionally avoids premature application architecture. The next layers will be introduced through versioned changes:

- provider gateway and routing
- reproducible coding benchmarks
- agent execution policies
- telemetry and cost accounting
- GCP deployment targets
- persistent project/workspace services
- automated evaluation and model escalation

See `ROADMAP.md` for sequencing.
