# 🍍 Ananas

**A cloud-native, provider-portable conversational work engine that starts general-purpose and specializes into high-value vertical products.**

Ananas is a home-grown assistant platform with a familiar modern conversational interaction model: conversation, files, projects, tools, skills, executable work, and persistent artifacts in one workspace. It is deliberately not tied to one industry or one model provider.

**Ananas Core** is the reusable platform. **DIRT RCM** is the first specialized vertical powered by that core. **Continuara** and future verticals reuse the same contracts rather than forking the platform.

> Build the conversation, context, artifact, tool, routing, execution, and telemetry substrate once. Specialize through vertical packs.

## Product model

```text
                         ┌──────────────────────────────┐
                         │       🍍 ANANAS CORE        │
                         │                              │
                         │ Chat • Projects • Files      │
                         │ Artifacts • Tools • Skills   │
                         │ Execution • API • Telemetry  │
                         │ Context • Model Routing      │
                         └──────────────┬───────────────┘
                                        │
                         vertical packs / policies / APIs
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 ▼                      ▼                      ▼
           DIRT RCM                Continuara          Future Verticals
      Revenue-cycle AI         Care/health product       Other niches
```

## Delivery state

Ananas uses explicit gates so infrastructure, experiments, prototypes, MVP code, and beta releases are not confused.

| Gate | Current state |
|---|---|
| **Scope** | Defined |
| **Proof of Concept** | Active / partial |
| **Prototype** | Editable visual prototype built; interaction/usability validation still required |
| **MVP** | Not yet achieved; implementation backlog active |
| **Pilot / Beta** | Not started |

Canonical boundaries: [`docs/SCOPE.md`](docs/SCOPE.md)  
Stage gates: [`docs/DELIVERY_LIFECYCLE.md`](docs/DELIVERY_LIFECYCLE.md)  
Canonical phase sequence: [`docs/ROADMAP.md`](docs/ROADMAP.md)

## Phase-1 MVP contract

The MVP proves the reusable core before any vertical is allowed to redefine it.

- Multi-turn conversational chat
- Persistent project/workspace context
- Project files and grounded retrieval
- Persistent editable artifacts: documents, code, tables, schemas, charts/structured data
- Governed tool and skill invocation with execution traces
- Sandboxed code/data execution
- Provider-neutral inference routing through LiteLLM
- NVIDIA route as primary default; OpenRouter as alternate/fallback
- API/headless access for downstream products
- Citations and source lineage where evidence is used
- Token, latency, reliability, retry/fallback, and cost telemetry
- Project/tenant isolation primitives
- Configuration-driven vertical packs and policy boundaries

The initial MVP is intentionally free; payment/subscription infrastructure is explicitly deferred rather than forced into the MVP.

See [`docs/MVP.md`](docs/MVP.md) for the functional acceptance gates.

### Context strategy

Ananas does **not** hard-code a claim that the platform itself is a native 1-million-token model. Context capacity is supplied by the selected provider/model. Practical working context is extended with project state, retrieval, summarization, files, and persistent artifacts while preserving the ability to route to larger-context models when justified.

## First vertical — DIRT RCM

**DIRT — Data Intelligence for Revenue Transformation** is the first hyper-specialized Ananas product for healthcare Revenue Cycle Management.

DIRT is an **audit and operational intelligence layer**, not a replacement EMR, PM system, or clearinghouse.

Initial DIRT boundary:

- No-PHI audit data contract and ingress boundary
- AR and denial leakage signals
- EDI and administrative-friction detection
- Human-reviewer queue prioritized by revenue impact and recovery probability
- Evidence-backed SOP/action recommendations
- Reviewer disposition and auditable outcome history
- Backend-ready tenant boundaries and structured APIs
- No automatic live claim submission in the MVP

See [`docs/DIRT_VERTICAL.md`](docs/DIRT_VERTICAL.md).

## Editable product design

Canonical active Figma file:

**[🍍 Ananas — MVP Product & DIRT Vertical](https://www.figma.com/design/mgVWhNifpTEdqdv9E487PQ)**

It contains editable frames for:

1. Product Architecture
2. Ananas Chat MVP
3. DIRT Reviewer Queue
4. DIRT No-PHI Data Contract
5. Delivery Lifecycle & Scope

The older Product System & UX Figma file remains a legacy brand/motion reference, not the active product definition. See [`design/FIGMA.md`](design/FIGMA.md).

## Reuse before rebuild

Ananas keeps the core lean. Five upstream repositories are pinned and consumed through explicit policies rather than copied wholesale.

| Repository | Tier | Policy |
|---|---:|---|
| `NVIDIA/skills` | 1 | `curated-install` |
| `vercel-labs/skills` | 1 | `dependency` |
| `microsoft/skills` | 1 | `curated-install` |
| `modelcontextprotocol/servers` | 1 | `reference-and-pin` |
| `NVIDIA/NeMo-Agent-Toolkit` | 2 | `evaluate-before-adoption` |

Canonical pins: [`config/upstreams.yaml`](config/upstreams.yaml)  
Governance: [`docs/UPSTREAMS.md`](docs/UPSTREAMS.md)

Validate and fetch the exact reviewed revisions into a Git-ignored local cache:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

Fetched source lives under `.ananas/upstreams/` and is **not** vendored into Ananas. Tier-2 NeMo Agent Toolkit remains outside core until its benchmark gate passes.

## Cloud-native development runtime

The existing development foundation remains a core advantage; it is the **engineering/runtime substrate**, not the product definition.

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
4. **Provider portable** — provider choices are configuration, not application architecture.
5. **Cost audited** — latency, token burn, reliability, and successful tasks per dollar are measured.
6. **Secure by default** — secrets never enter Git; privileged tools use least privilege and explicit boundaries.
7. **Reuse before rebuild** — curated skills, MCP references, and dependencies are checked before net-new frameworks are written.
8. **Verticals without forks** — DIRT/Continuara add policies, skills, schemas, connectors, evals, and UI modules to the shared core.

## Development quick start

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

## Repository map

```text
-Ananas/
├── app/                  # chat-first web/product shell
├── components/           # reusable UI components
├── .devcontainer/        # Codespaces configuration
├── .github/              # repository automation/governance
├── benchmarks/           # model, agent, and adoption evaluations
├── config/               # safe configuration + upstream registry
├── design/               # Figma/design source links and manifests
├── docs/                 # scope, lifecycle, product, architecture, verticals, roadmap
├── scripts/              # bootstrap, health, upstream, automation
├── src/                  # core application/runtime source
├── tests/                # product/runtime tests
├── AGENTS.md
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

## Key documents

- Scope: [`docs/SCOPE.md`](docs/SCOPE.md)
- Delivery lifecycle: [`docs/DELIVERY_LIFECYCLE.md`](docs/DELIVERY_LIFECYCLE.md)
- MVP: [`docs/MVP.md`](docs/MVP.md)
- Product: [`docs/PRODUCT.md`](docs/PRODUCT.md)
- Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- DIRT vertical: [`docs/DIRT_VERTICAL.md`](docs/DIRT_VERTICAL.md)
- Upstream policy: [`docs/UPSTREAMS.md`](docs/UPSTREAMS.md)
- GitHub Projects model: [`docs/PROJECTS.md`](docs/PROJECTS.md)
- Roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md)
- Cost strategy: [`docs/COST_STRATEGY.md`](docs/COST_STRATEGY.md)
- Setup: [`docs/SETUP.md`](docs/SETUP.md)
- Security: [`SECURITY.md`](SECURITY.md)
- Figma: [`design/FIGMA.md`](design/FIGMA.md)

## License

Licensed under the **Apache License 2.0**. See [`LICENSE`](LICENSE).
