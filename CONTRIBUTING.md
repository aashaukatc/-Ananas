# Contributing to 🍍 Ananas

## Before starting

Read the contracts that determine whether the work belongs in the current product:

1. `docs/SCOPE.md` — Phase-1 inclusions/exclusions
2. `docs/DELIVERY_LIFECYCLE.md` — Scope/PoC/Prototype/MVP/Pilot evidence
3. `docs/ROADMAP.md` — canonical phase sequence
4. `docs/UPSTREAMS.md` — reuse-before-rebuild policy
5. `AGENTS.md` — contributor/agent operating rules

Do not turn an interesting idea into Phase-1 scope merely because it is technically possible.

## Development flow

1. Work from an up-to-date `main` branch.
2. Create a focused branch for non-trivial changes.
3. Identify the Product and Delivery Stage for the work.
4. Check existing Ananas capability and relevant canonical upstreams before writing a new framework/subsystem.
5. Keep commits small and descriptive.
6. Run repository validation locally before opening a pull request:

```bash
bash scripts/healthcheck.sh
bash scripts/upstreams/validate-registry.sh
find scripts .devcontainer -type f -name '*.sh' -print0 | xargs -0 -r -n1 bash -n
npm run build
```

7. Open a pull request describing the outcome, stage evidence, scope impact, reuse decision, tests, risk/security, and cost impact.

## Upstream source

Fetch the exact reviewed upstream revisions when inspection or adaptation is needed:

```bash
bash scripts/upstreams/fetch-pinned.sh
```

This uses `.ananas/upstreams/`, which is Git-ignored. Do not copy that cache into the repository.

## Engineering rules

- Never commit secrets, PHI, client data, or credentials.
- Prefer reproducible configuration over manual setup.
- Reuse/adapt mature upstream capability before creating duplicate frameworks.
- Avoid adding infrastructure until a real requirement justifies it.
- Keep provider/model identifiers configurable.
- Keep domain-specific logic out of Ananas Core unless it is a genuinely shared contract.
- Add tests/evidence appropriate to the Delivery Stage.
- Document architecture-changing decisions.
- Prefer boring, maintainable components over unnecessary framework layers.
- Do not describe prototype-only behavior as working MVP capability.

## Stage-specific contribution evidence

- **PoC:** reproducible answer to a technical risk question; throwaway code is acceptable.
- **Prototype:** Figma/walkthrough evidence and UX outcome; synthetic data only.
- **MVP:** real persistence/security/runtime path plus acceptance tests.
- **Pilot/Beta:** real-user telemetry, reliability, incident/rollback readiness, and measured outcomes.

## Commit style

Use short conventional-style prefixes where practical:

- `feat:` new behavior
- `fix:` bug correction
- `docs:` documentation
- `test:` tests
- `ci:` CI/CD changes
- `design:` Figma/design manifest or UX contract
- `security:` security/privacy control
- `chore:` maintenance
- `refactor:` internal code restructuring

## Pull request standard

The repository PR template is authoritative. At minimum a pull request should state:

- **why** the change is required;
- **product + delivery stage**;
- **scope impact**;
- **reuse/upstream decision**;
- **what** changed;
- **how** it was validated;
- **risk/security/privacy** impact;
- **cost/compute** impact;
- **rollback** path.
