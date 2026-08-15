# 🍍 Ananas

**Cloud-native autonomous software engineering workspace.**

Ananas is a cloud-native autonomous software engineering workspace combining GitHub Codespaces, Google Cloud, Continue, NVIDIA Nemotron, OpenRouter, and a local LiteLLM routing layer for low-cost, hardware-independent AI development. It enables agentic coding, refactoring, testing, debugging, and deployment without local GPUs.

## Why Ananas

Ananas separates the **developer workspace** from **AI inference compute**:

- **GitHub Codespaces** — primary browser-based development environment
- **GitHub** — permanent source of truth, version control, CI/CD, and project governance
- **Continue** — open-source AI coding interface inside VS Code/Codespaces/code-server
- **LiteLLM** — local provider-neutral gateway, retry layer, and NVIDIA → OpenRouter failover controller
- **NVIDIA Nemotron** — primary remote reasoning/coding route
- **OpenRouter** — alternate model/provider route and fallback
- **Google Cloud** — secondary persistent VM environment, deployment, integration testing, and production-like workloads when needed
- **No local GPU required** — the local device only needs a modern browser

## Target Architecture

```text
Browser / basic laptop
        │
        ├─────────────────────────────────────────────┐
        │                                             │
        ▼                                             ▼
GitHub Codespaces                            Google Compute Engine
PRIMARY WORKSPACE                            SECONDARY / PERSISTENT
VS Code + Continue                           code-server + Continue
        │                                             │
        └──────────────────┬──────────────────────────┘
                           ▼
                     LiteLLM gateway
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
           NVIDIA Nemotron     OpenRouter
              primary           fallback

GitHub repository = permanent source of truth
```

## Design Principles

1. **Codespaces first** — consume the included GitHub development environment before spending cloud infrastructure credits.
2. **Cloud-native** — development can happen from any browser-capable device.
3. **Compute-decoupled** — AI inference does not depend on the Codespace, GCP VM, or local hardware having a GPU.
4. **Cost-aware** — use included/free development capacity first; consume GCP only when persistence, deployment, or production-like infrastructure adds value.
5. **Provider-portable** — route models through configuration rather than binding the project to a single inference provider.
6. **Secure by default** — secrets belong in Codespaces secrets or local protected environment files, never in Git.
7. **Automation-first** — setup, validation, testing, and deployment should be reproducible.
8. **GitHub-anchored** — architecture, configuration, code, documentation, and operational decisions remain version controlled.

## Repository Layout

```text
-Ananas/
├── .devcontainer/       # GitHub Codespaces / Dev Container configuration
├── .github/             # GitHub automation and repository guidance
├── benchmarks/          # Reproducible coding-model/agent evaluations
├── config/              # Safe configuration templates (no secrets)
├── docs/                # Architecture, setup, roadmap, and cost strategy
├── scripts/             # Codespaces bootstrap + production GCP VM bootstrap
├── src/                 # Application/source code
├── tests/               # Automated product tests
├── .editorconfig
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── README.md
```

## Quick Start

### Path A — GitHub Codespaces (recommended default)

From this repository, select **Code → Codespaces → Create codespace on main**.

The included Dev Container configuration initializes the baseline development environment automatically.

Configure these as **Codespaces secrets** or shell environment variables — never commit real keys:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

Then validate the Codespace:

```bash
bash scripts/healthcheck.sh
```

The Codespace bootstrap copies the safe repository Continue template to `~/.continue/config.yaml` when no local Continue config exists.

### Path B — Google Compute Engine persistent workspace

Use this only when you need a persistent VM, production-like Linux services, deployment testing, or a workspace independent of Codespaces runtime limits.

On an Ubuntu 22.04+ GCE VM, clone this repository and run:

```bash
bash scripts/ananas-gcp-bootstrap.sh
```

The script:

- installs Node.js, Python tooling, code-server, Continue, and LiteLLM;
- binds code-server to `127.0.0.1:8080` only;
- binds the AI gateway to `127.0.0.1:4000` only;
- configures NVIDIA Nemotron as the primary route;
- configures OpenRouter as automatic fallback when both API keys are supplied;
- writes provider credentials only to protected local files;
- creates a systemd-managed gateway;
- creates a one-command `ananas-healthcheck` inference test.

Use an SSH/IAP tunnel instead of opening the IDE to the public internet:

```bash
gcloud compute ssh YOUR_VM_NAME --zone=YOUR_ZONE -- -L 8080:127.0.0.1:8080
```

Then browse locally to:

```text
http://127.0.0.1:8080
```

## Model Evaluation

Ananas does not promote a model based on marketing claims alone. The repository contains a reproducible brownfield coding benchmark:

- [`benchmarks/nemotron-vs-frontier.md`](benchmarks/nemotron-vs-frontier.md) — concurrency, idempotency, retry, testing, autonomy, latency, and cost evaluation
- [`benchmarks/README.md`](benchmarks/README.md) — benchmark workspace guidance

The default adoption gate is to keep Nemotron as the primary backbone only when it maintains at least **90% of the frontier baseline correctness score** while materially improving inference economics, or wins on successful tasks per dollar.

## Initial Development Stack

| Layer | Default |
|---|---|
| Primary workspace | GitHub Codespaces |
| Persistent workspace | Google Compute Engine |
| Editor | VS Code / code-server |
| AI coding interface | Continue |
| Local routing layer | LiteLLM |
| Primary inference route | NVIDIA Nemotron |
| Alternate route | OpenRouter |
| Runtime | Node.js + Python 3 |
| Cloud deployment | Google Cloud |
| Source control | GitHub |
| Secrets | Codespaces secrets / protected environment files |

## Security

- Never commit API keys, service-account JSON files, `.env` files, credentials, tokens, or cloud secrets.
- Treat public-repository history as permanent.
- Use least-privilege credentials for GitHub and Google Cloud integrations.
- Keep provider endpoints and model names configurable rather than embedded throughout application source code.
- Keep code-server and LiteLLM localhost-bound; use SSH/IAP tunneling for remote access.

See [`SECURITY.md`](SECURITY.md).

## Status

**Phase 1 — Dual-runtime foundation**

The repository now supports both the low-cost Codespaces-first development path and a hardened GCP VM path. The next phases introduce live provider validation, executable benchmark fixtures, autonomous coding workflows, telemetry/cost controls, and Google Cloud deployment targets.

- Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Setup: [`docs/SETUP.md`](docs/SETUP.md)
- Cost strategy: [`docs/COST_STRATEGY.md`](docs/COST_STRATEGY.md)
- Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- GCP bootstrap: [`scripts/ananas-gcp-bootstrap.sh`](scripts/ananas-gcp-bootstrap.sh)
- Model benchmark: [`benchmarks/nemotron-vs-frontier.md`](benchmarks/nemotron-vs-frontier.md)

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE).
