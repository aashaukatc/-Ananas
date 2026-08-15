# 🍍 Ananas

**Cloud-native autonomous software engineering workspace.**

Ananas is a cloud-native autonomous software engineering workspace combining GitHub Codespaces, Google Cloud, Continue, NVIDIA Nemotron, and OpenRouter for low-cost, hardware-independent AI development. It enables agentic coding, refactoring, testing, debugging, and deployment without local GPUs.

## Why Ananas

Ananas separates the **developer workspace** from **AI inference compute**:

- **GitHub Codespaces** — primary browser-based development environment
- **GitHub** — source of truth, version control, CI/CD, and project governance
- **Continue** — open-source AI coding interface inside VS Code/Codespaces
- **NVIDIA Nemotron** — primary remote reasoning/coding model
- **OpenRouter** — alternate model/provider route and fallback option
- **Google Cloud** — deployment, integration testing, persistent services, and production-like workloads when needed
- **No local GPU required** — the local device only needs a modern browser

## Target Architecture

```text
Browser / basic laptop
        │
        ▼
GitHub Codespaces
(VS Code + Continue + tools)
        │
        ├────────► NVIDIA Nemotron
        │           primary inference
        │
        ├────────► OpenRouter
        │           alternate/fallback inference
        │
        └────────► Google Cloud
                    deployment / services / testing

GitHub repository = permanent source of truth
```

## Design Principles

1. **Cloud-native** — development can happen from any browser-capable device.
2. **Compute-decoupled** — AI inference does not depend on the Codespace or local hardware having a GPU.
3. **Cost-aware** — use included/free development capacity first; consume paid cloud infrastructure only when it adds value.
4. **Provider-portable** — avoid hard-coding the project to one model provider.
5. **Secure by default** — secrets belong in GitHub Codespaces secrets or environment variables, never in Git.
6. **Automation-first** — setup, validation, testing, and deployment should be reproducible.
7. **GitHub-anchored** — architecture, configuration, code, documentation, and operational decisions remain version controlled.

## Repository Layout

```text
-Ananas/
├── .devcontainer/       # GitHub Codespaces / Dev Container configuration
├── .github/             # GitHub automation and repository guidance
├── config/              # Safe configuration templates (no secrets)
├── docs/                # Architecture, roadmap, and operating documentation
├── scripts/             # Bootstrap, health-check, and maintenance scripts
├── src/                 # Application/source code (introduced as the platform evolves)
├── tests/               # Automated tests
├── .editorconfig
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

## Quick Start

### 1. Open in GitHub Codespaces

From this repository, select **Code → Codespaces → Create codespace on main**.

The included Dev Container configuration installs the baseline development tools automatically.

### 2. Configure secrets

Create these as **Codespaces secrets** or shell environment variables — never commit real keys:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

A safe template is provided in `.env.example`.

### 3. Validate the environment

```bash
./scripts/healthcheck.sh
```

### 4. Configure Continue

Use the templates and guidance under `config/` and `docs/`. Provider credentials must remain external to the repository.

## Initial Development Stack

| Layer | Default |
|---|---|
| Workspace | GitHub Codespaces |
| Editor | VS Code |
| AI coding interface | Continue |
| Primary model route | NVIDIA Nemotron |
| Alternate route | OpenRouter |
| Runtime | Node.js 22 + Python 3 |
| Cloud deployment | Google Cloud |
| Source control | GitHub |
| Secrets | Codespaces secrets / environment variables |

## Security

- Never commit API keys, service-account JSON files, `.env` files, credentials, tokens, or cloud secrets.
- Treat public-repository history as permanent.
- Use least-privilege credentials for GitHub and Google Cloud integrations.
- Keep provider endpoints and model names configurable rather than embedded throughout source code.

See [`SECURITY.md`](SECURITY.md) for reporting and operational guidance.

## Status

**Phase 0 — Foundation / bootstrap**

The repository is being established as the control plane for Ananas. The next phases introduce provider routing, reproducible benchmark tasks, agent workflows, CI, and Google Cloud deployment targets.

See [`docs/ROADMAP.md`](docs/ROADMAP.md).

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE).
