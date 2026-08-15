# 🍍 Ananas

**A cloud-native, provider-portable conversational work engine that starts general-purpose and specializes into high-value vertical products.**

Ananas is a home-grown assistant platform with a familiar ChatGPT/Claude-style interaction model: conversation, files, projects, tools, skills, executable work, and persistent artifacts in one workspace. It is deliberately not tied to one industry or one model provider.

**Phase 1** builds the reusable general-purpose core. **DIRT RCM** is the first specialized vertical powered by that core, followed by products such as **Continuara** and other domain-specific applications.

> Build the intelligence, tooling, artifact, routing, and execution substrate once. Specialize through domain packs instead of forking the platform.

## Product Model

```text
                         ┌──────────────────────────────┐
                         │       🍍 ANANAS CORE        │
                         │                              │
                         │ Chat • Projects • Files      │
                         │ Artifacts • Tools • Skills   │
                         │ Execution • API • Telemetry  │
                         │ Memory/Context • Model Route │
                         └──────────────┬───────────────┘
                                        │
                         Domain packs / policies / APIs
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 ▼                      ▼                      ▼
           DIRT RCM                Continuara          Future Verticals
      Revenue-cycle AI         Care/health product      Other niches
```

## Phase 1 — Ananas MVP

The MVP proves the core before industry specialization.

- Multi-turn conversational chat
- Project/workspace context and file attachments
- Persistent artifacts beside chat: documents, code, tables, schemas, charts
- Tool and skill invocation with concise execution status
- Sandboxed code/data execution
- Provider-neutral inference routing through LiteLLM
- NVIDIA route as the primary default; OpenRouter as alternate/fallback
- API/headless access for downstream products
- Citations and source lineage where evidence is used
- Token, latency, reliability, and cost telemetry
- Configuration-driven vertical packs and policy boundaries

See [`docs/MVP.md`](docs/MVP.md) for the acceptance gates and explicit non-goals.

### Context strategy

Ananas does **not** hard-code a claim that the platform itself is a native 1-million-token model. Context capacity is supplied by the selected provider/model. Ananas extends practical working context with project state, retrieval, summarization, files, and persistent artifacts while remaining free to route to larger-context models when justified.

## First Vertical — DIRT RCM

**DIRT — Data Intelligence for Revenue Transformation** is the first hyper-specialized Ananas product for healthcare Revenue Cycle Management.

DIRT is an **audit and operational intelligence layer**, not a replacement EMR, PM system, or clearinghouse.

Initial vertical capabilities:

- No-PHI audit data contract and intake boundary
- AR and denial leakage signals
- EDI and administrative-friction detection
- Human-reviewer queue prioritized by revenue impact and recovery probability
- Evidence-backed SOP/action recommendations
- Reviewer disposition and immutable audit history
- Backend-ready tenant boundaries and structured APIs

See [`docs/DIRT_VERTICAL.md`](docs/DIRT_VERTICAL.md).

## Editable Product Design

Canonical Figma file:

**[🍍 Ananas — MVP Product & DIRT Vertical](https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ)**

It contains:

1. Product architecture — Ananas core → vertical products
2. Phase-1 Ananas conversational workspace
3. DIRT Human Reviewer Queue
4. DIRT No-PHI data contract

Design governance is documented in [`design/FIGMA.md`](design/FIGMA.md).

## Reuse Before Rebuild

Ananas keeps the core lean. Upstream projects are pinned and consumed through explicit policies rather than copied wholesale.

| Repository | Tier | Policy |
|---|---:|---|
| `NVIDIA/skills` | 1 | `curated-install` |
| `vercel-labs/skills` | 1 | `dependency` |
| `microsoft/skills` | 1 | `curated-install` |
| `modelcontextprotocol/servers` | 1 | `reference-and-pin` |
| `NVIDIA/NeMo-Agent-Toolkit` | 2 | `evaluate-before-adoption` |

Machine-readable pins: [`config/upstreams.yaml`](config/upstreams.yaml)  
Governance: [`docs/UPSTREAMS.md`](docs/UPSTREAMS.md)

**Tier 1 does not mean fork or vendor everything.** Tier 2 remains outside core until benchmark evidence justifies adoption.

## Cloud-Native Development Runtime

The existing development foundation remains a core advantage; it is now correctly treated as the **engineering/runtime substrate for the product**, not the product definition itself.

```text
Browser / basic laptop
        │
        ├─────────────────────────────────────────────┐
        │                                             │
        ▼                                             ▼
GitHub Codespaces                            Google Compute Engine
PRIMARY DEVELOPMENT                          OPTIONAL PERSISTENT RUNTIME
VS Code + Continue                           code-server + Continue
        │                                             │
        └──────────────────┬──────────────────────────┘
                           ▼
                     LiteLLM gateway
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
           NVIDIA route        OpenRouter
              primary          alternate/fallback

GitHub repository = durable source of truth
```

### Operating principles

1. **GitHub anchored** — source, architecture, product specs, benchmarks, and decisions remain version controlled.
2. **Codespaces first** — use included development capacity before consuming cloud credits.
3. **Compute decoupled** — the workspace does not need a local GPU.
4. **Provider portable** — model/provider choices are configuration, not application architecture.
5. **Cost audited** — latency, token burn, reliability, and successful tasks per dollar are measured.
6. **Secure by default** — secrets never enter Git; privileged tools use least privilege and explicit boundaries.
7. **Reuse before rebuild** — curated skills, MCP reference patterns, and dependencies are preferred over duplicated frameworks.
8. **Verticals without forks** — DIRT/Continuara add policies, skills, schemas, connectors, evals, and UI modules to the shared core.

## Development Quick Start

### GitHub Codespaces — default

Create a Codespace from `main`, configure provider credentials as Codespaces secrets/environment variables, then run:

```bash
bash scripts/healthcheck.sh
```

Provider secrets currently include:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

### Google Compute Engine — persistent/production-like work

On an Ubuntu 22.04+ VM:

```bash
bash scripts/ananas-gcp-bootstrap.sh
```

Keep code-server and LiteLLM localhost-bound and use SSH/IAP tunneling rather than exposing the IDE/gateway directly to the public internet.

See [`docs/SETUP.md`](docs/SETUP.md) and [`SECURITY.md`](SECURITY.md).

## Repository Map

```text
-Ananas/
├── app/                  # Ananas web/product surface
├── components/           # reusable UI components
├── .devcontainer/        # Codespaces configuration
├── .github/              # repository automation/governance
├── benchmarks/           # model, agent, and adoption evaluations
├── config/               # safe configuration + upstream registry
├── design/               # Figma/design source links and artifacts
├── docs/                 # product, architecture, verticals, roadmap
├── scripts/              # bootstrap, health, automation
├── src/                  # core application/runtime source
├── tests/                # product/runtime tests
├── AGENTS.md
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

## Current Product Sequence

```text
Foundation already built
Codespaces + GCP + Continue + LiteLLM + provider routing
                    │
                    ▼
Phase 1 — Ananas conversational MVP
Chat + projects + files + artifacts + tools + API + telemetry
                    │
                    ▼
Phase 2 — DIRT vertical pack
No-PHI audit + RCM signals + reviewer queue + governed feedback
                    │
                    ▼
Phase 3 — additional verticals
Continuara + future specialized products
```

## Key Documents

- MVP: [`docs/MVP.md`](docs/MVP.md)
- Product: [`docs/PRODUCT.md`](docs/PRODUCT.md)
- Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- DIRT vertical: [`docs/DIRT_VERTICAL.md`](docs/DIRT_VERTICAL.md)
- Upstream policy: [`docs/UPSTREAMS.md`](docs/UPSTREAMS.md)
- Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- Cost strategy: [`docs/COST_STRATEGY.md`](docs/COST_STRATEGY.md)
- Setup: [`docs/SETUP.md`](docs/SETUP.md)
- Security: [`SECURITY.md`](SECURITY.md)
- Figma: [`design/FIGMA.md`](design/FIGMA.md)

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE).
