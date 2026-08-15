## Summary

Describe the user/product/engineering problem and the change that addresses it.

## Product / Delivery Stage

- Product: `Ananas Core | DIRT | Continuara | Shared Infrastructure | Ecosystem`
- Delivery Stage: `Scope | PoC | Prototype | MVP | Pilot/Beta | Post-MVP`

## Scope impact

- [ ] This change stays inside the current Phase-1 scope.
- [ ] OR this intentionally changes scope and updates `docs/SCOPE.md` in this PR.
- [ ] Core/vertical ownership remains clear; domain-specific behavior is not leaking into Ananas Core.

## Reuse before rebuild

- [ ] Existing Ananas capability was checked first.
- [ ] Relevant canonical upstreams were checked where applicable.
- [ ] New net-code/framework work is justified by a remaining gap.
- [ ] Any upstream pin/policy change updates `config/upstreams.yaml` and includes review/validation evidence.
- [ ] No external repository or `.ananas/upstreams/` cache content is vendored accidentally.

## Validation / Evidence

- [ ] Relevant tests/checks pass.
- [ ] `bash scripts/healthcheck.sh` passes where applicable.
- [ ] `bash scripts/upstreams/validate-registry.sh` passes where applicable.
- [ ] No secrets, PHI, credentials, or private data are included.
- [ ] Evidence matches the Delivery Stage (PoC result, prototype review, MVP test, beta metric, etc.).
- [ ] Prototype-only behavior is not described as working MVP capability.

## Design impact

- [ ] No product/design contract changed.
- [ ] OR Figma + corresponding repository specification were updated together.

Active prototype inventory: `design/FIGMA.md`.

## Risk / Security / Privacy

Describe failure modes, permission changes, data-boundary changes, compatibility concerns, and rollback considerations.

For DIRT/healthcare work, state explicitly whether PHI could enter the path and how the relevant boundary is enforced.

## Cost / Compute Impact

State the expected impact on Codespaces, GCP, inference tokens, model/provider cost, external APIs, storage, or egress. Use `None` when there is no material impact.

## Rollback

State how the change can be disabled/reverted without losing user/project data or corrupting vertical contracts.
