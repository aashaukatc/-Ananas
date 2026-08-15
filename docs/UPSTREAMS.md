# Upstream Reuse Policy

Ananas is intentionally built around **composition rather than wholesale vendoring**. Mature upstream capabilities should be reused where they reduce engineering work without forcing Ananas to own entire external codebases.

## Canonical registry

There is **one canonical machine-readable upstream registry**: [`config/upstreams.yaml`](../config/upstreams.yaml). Do not create a second `upstream/registry.yaml`, spreadsheet, manifest, or prose inventory that competes with it.

The registry now records for each upstream:

- repository and role;
- Tier and Ananas integration policy;
- reviewed ref + exact 40-character pin;
- `vendor: false` policy;
- provenance;
- repository-level SPDX/license metadata and Ananas license-review state;
- Ananas security-review/adoption state;
- benchmark gate where required.

| Repository | Tier | Policy | Repository license metadata | Ananas review state |
|---|---:|---|---|---|
| `NVIDIA/skills` | 1 | `curated-install` | Apache-2.0 | source fetch approved; selected execution still requires review |
| `vercel-labs/skills` | 1 | `dependency` | MIT | source fetch approved; dependency/use review still required |
| `microsoft/skills` | 1 | `curated-install` | MIT | source fetch approved; selected execution still requires review |
| `modelcontextprotocol/servers` | 1 | `reference-and-pin` | GitHub repository metadata reports `NOASSERTION` | reference source only until component/license review |
| `NVIDIA/NeMo-Agent-Toolkit` | 2 | `evaluate-before-adoption` | Apache-2.0 | evaluation source only; not approved as Core dependency |

Repository-level license metadata is an inventory signal, not proof that every nested skill, package, sample, asset, or transitive dependency carries the same terms. Component-level promotion still requires review.

**Canonical count: 4 Tier-1 + 1 Tier-2 = 5 upstream repositories.**

## Getting the reviewed upstream source

The repository has a reproducible, non-vendoring fetch path:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

This fetches the **exact pinned revisions** into:

```text
.ananas/upstreams/
```

That directory is Git-ignored. It exists so contributors and agents can inspect, benchmark, adapt, and reuse upstream code/skills without copying five external repositories into Ananas history.

A successful fetch means **source is available locally at the reviewed pin**. It does **not** mean every upstream capability is automatically trusted, installed, executed, or promoted into Ananas Core.

## Tier 1 rule

Tier 1 does **not** mean clone, fork, or copy the entire repository into Ananas.

Allowed integration patterns:

- fetch the reviewed source into the local upstream cache;
- install selected reviewed skills;
- depend on reviewed released packages where appropriate;
- adapt reference implementations behind Ananas-owned interfaces;
- pin reviewed commit/version identifiers;
- maintain provenance, license, and permission metadata;
- update deliberately through reviewable pull requests;
- contribute generally useful fixes upstream rather than carrying avoidable forks.

Avoid:

- subtree copies with no update path;
- unreviewed scripts running with broad credentials;
- duplicating upstream source only to make minor local changes;
- binding Ananas Core contracts to one vendor's internal API;
- executing fetched upstream code merely because it is present in `.ananas/upstreams/`.

## Tier 2 rule

`NVIDIA/NeMo-Agent-Toolkit` remains outside Ananas Core until a benchmark demonstrates a material advantage over the existing lightweight orchestration path.

Adoption requires evidence for at least:

1. task completion/correctness;
2. orchestration complexity removed;
3. latency impact;
4. token/inference cost;
5. observability quality;
6. human-in-the-loop controls;
7. provider portability;
8. operational maintenance burden.

A Tier-2 component should be adopted only if it improves successful tasks per dollar or substantially reduces Ananas-owned orchestration code without creating unacceptable lock-in.

## Reuse decision sequence

Before writing a new Ananas subsystem, use this order:

```text
Need identified
  → search existing Ananas capability
  → check Tier-1 upstreams / MCP references
  → inspect exact reviewed pin from .ananas/upstreams/
  → evaluate a released package or selected skill
  → wrap behind an Ananas-owned adapter
  → build net-new code only for the remaining gap
```

This is the practical anti-reinvention rule.

## Supply-chain controls

Before promoting or updating an upstream component:

1. Review repository and component-level license terms plus transitive dependencies.
2. Review the exact pinned diff from the previously approved version.
3. Run relevant tests/benchmarks.
4. Inspect credential, network, filesystem, subprocess, and code-execution behavior.
5. Restrict permissions to the minimum required by the selected skill/tool.
6. Update the approved pin and review metadata in `config/upstreams.yaml`.
7. Prefer an adapter boundary so a component can be removed without rewriting product logic.
8. Keep the fetched source cache outside Git history.
9. Treat `security_review` as Ananas adoption state, never as a claim that upstream software is vulnerability-free.

## Current pins — 2026-08-15

- `NVIDIA/skills` → `a9130c6036de4603499924a3f2687cb6c42101ca`
- `vercel-labs/skills` → `c6f69c631292444cc541ac6d91e2226b0ff247da`
- `microsoft/skills` → `e20084b9d230c6f3b46ce36f011e6c3e50f79f8a`
- `modelcontextprotocol/servers` → `76d64c822f5125032f89eb71dbdb94e42b434821`
- `NVIDIA/NeMo-Agent-Toolkit` (`develop`) → `a35d30cdaf2327e93cb9b47e0ddb447e1d64f523`

These are provenance/reproducibility pins, not blanket permission to import or execute every component at those revisions.
