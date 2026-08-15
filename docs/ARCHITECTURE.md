# 🍍 Ananas Architecture

## 1. Purpose

Ananas is a cloud-native autonomous software-engineering workspace designed to maximize useful coding capability while minimizing local-hardware and cloud-GPU requirements.

GitHub is the durable control plane. Development environments may be disposable; source, configuration templates, documentation, benchmarks, and automation remain version controlled.

## 2. Logical Architecture

```text
Developer
   │
   ▼
Browser / VS Code client
   │
   ├──────────────────────────────────────┐
   │                                      │
   ▼                                      ▼
GitHub Codespaces                 Google Compute Engine
PRIMARY WORKSPACE                 PERSISTENT WORKSPACE
   │                                      │
   ├── Git + GitHub                       ├── Git + GitHub
   ├── Node.js / Python                   ├── Node.js / Python
   ├── Continue                           ├── code-server + Continue
   ├── tests / linters                    ├── tests / linters
   │                                      │
   │                               localhost LiteLLM
   │                                      │
   └──────────────────┬───────────────────┘
                      │
             Remote AI inference
                      │
             ┌────────┴────────┐
             ▼                 ▼
      NVIDIA Nemotron      OpenRouter
          primary           fallback

GitHub repository = permanent source of truth
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
- Direct NVIDIA and OpenRouter model selection through Continue
- No dedicated GPU requirement

### Google Compute Engine

- Optional persistent development workspace
- Production-like Linux/systemd behavior
- Integration and deployment targets
- Persistent services and networking/IAM validation
- No GPU required for the control plane

### Continue

- IDE-facing AI coding layer
- Chat/edit/apply workflows
- Provider abstraction at the developer interface

### LiteLLM

- Local provider-neutral gateway on the GCP workspace
- Authentication boundary for the IDE
- Retry control
- Ordered NVIDIA → OpenRouter failover
- Keeps provider-specific routing out of the editor configuration

### NVIDIA Nemotron

- Primary remote reasoning/coding route
- Heavy inference remains outside the Codespace/GCP workspace

### OpenRouter

- Alternate model/provider route
- Automatic failover target on the GCP gateway when both providers are configured
- Direct selectable route in Codespaces

## 4. Security Model

1. Repository contains templates, never production credentials.
2. Codespaces API keys are injected at runtime using Codespaces secrets/environment variables.
3. GCP bootstrap stores provider credentials only in local protected files with restrictive permissions.
4. code-server binds to `127.0.0.1:8080` and should be reached through SSH/IAP tunneling.
5. LiteLLM binds to `127.0.0.1:4000`; it is not intended to be internet-exposed.
6. Google Cloud credentials use least privilege and should prefer workload identity/OIDC over long-lived keys as the platform matures.
7. Public Git history is assumed permanent.
8. CI operates with read-only repository permissions unless a workflow explicitly requires more.

## 5. Cost Model

Resource allocation follows this order:

1. Included GitHub/Codespaces capacity
2. Free or promotional remote inference capacity where appropriate
3. Google Cloud student/credit-backed infrastructure only for workloads requiring persistence, deployment, or infrastructure validation
4. Paid inference/compute only when justified by task success, latency, or reliability

The default architecture deliberately avoids renting GPUs on Google Cloud because model inference is decoupled from the development workspace.

## 6. Model Promotion Policy

A model is not promoted based on marketing claims. Ananas evaluates candidate coding models using the reproducible brownfield benchmark in:

```text
benchmarks/nemotron-vs-frontier.md
```

Primary measures include:

- hidden-test correctness
- concurrency/data-integrity behavior
- test quality
- autonomous completion
- latency
- token/API cost
- successful tasks per dollar

## 7. Current Evolution

The foundation now includes:

- Codespaces-first development
- hardened persistent GCP workspace automation
- NVIDIA/OpenRouter routing
- LiteLLM failover on the GCP path
- reproducible coding-model benchmark criteria

Next layers:

- executable benchmark fixture repository/code
- agent execution policies
- telemetry and cost accounting
- GCP deployment targets
- persistent project/workspace services
- automated evaluation and model escalation

See `ROADMAP.md` for sequencing.
