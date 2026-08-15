# Ananas Agent Guidance

## Product truth

- Ananas is a **conversational work engine**, not primarily an IDE or engineering dashboard.
- Ananas Core stays domain-neutral; DIRT, Continuara, and future products are vertical packs over shared core contracts.
- `docs/SCOPE.md` defines the Phase-1 boundary.
- `docs/DELIVERY_LIFECYCLE.md` defines Scope → PoC → Prototype → MVP → Pilot/Beta evidence gates.
- `docs/MVP.md` defines the functional MVP acceptance contract.
- `docs/ROADMAP.md` is the canonical phase sequence. Do not invent a second roadmap in another file.

## Engineering/runtime

- GitHub is the durable source of truth.
- Prefer Codespaces for interactive development; use GCP for persistent or production-like workloads that justify it.
- Route hosted inference through the provider abstraction/LiteLLM path. NVIDIA is primary; OpenRouter is alternate/fallback.
- Keep provider/model names configurable rather than embedding them across product code.
- Never commit provider credentials, service-account JSON, tokens, `.env` files, or local upstream caches.

## Reuse before rebuild

- Before creating a new framework/subsystem, check existing Ananas code and the five canonical upstream repositories.
- Canonical upstream policy/pins live in `config/upstreams.yaml` — **not** `upstream/registry.yaml` or another duplicate registry.
- Validate and fetch reviewed source with:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

- Fetched repositories live in `.ananas/upstreams/` and must remain outside Git history.
- Tier 1 means curated reuse/dependency/reference, not wholesale vendoring.
- `NVIDIA/NeMo-Agent-Toolkit` is Tier 2 and must not become a core dependency until its benchmark/adoption gate passes.
- Prefer adapters around upstream APIs so upstream components can be replaced without rewriting product logic.

## Stage discipline

- **PoC:** optimize for evidence, not polish. Throwaway code is acceptable.
- **Prototype:** use synthetic/fake data and do not represent visible controls as production behavior.
- **MVP:** only claim capability when the real path, persistence, security, and acceptance evidence exist.
- **Pilot/Beta:** require limited access, telemetry, incident/rollback procedures, and measured outcomes.
- A polished Figma frame or UI scaffold is not proof of MVP completion.

## Product/design

- Product UI follows `docs/BRAND.md`, `docs/PRODUCT.md`, and the active Figma file indexed in `design/FIGMA.md`.
- Conversation is the primary surface; projects/files/artifacts/tools support it.
- Technical route/cost/execution state should be available but not dominate the user task.
- Do not resurrect the legacy developer Command Center as the main product surface.
- Avoid generic AI imagery, competitor visual cloning, and unsupported context/performance/autonomy claims.

## Validation

- Benchmark model/routing/orchestration changes before promoting defaults.
- Attach validation evidence to completed work.
- If a change alters Phase-1 inclusions/exclusions, update `docs/SCOPE.md` in the same change.
- If a change alters a Figma product contract, update the corresponding repository spec in the same change.
