# Upstream Reuse Policy

Ananas is intentionally built around composition rather than wholesale vendoring. Mature upstream capabilities should be reused where they reduce engineering work without taking ownership of entire external codebases.

## Canonical registry

Machine-readable pins live in [`config/upstreams.yaml`](../config/upstreams.yaml).

| Repository | Tier | Role | Policy |
|---|---:|---|---|
| `NVIDIA/skills` | 1 | Agent Skills | `curated-install` |
| `vercel-labs/skills` | 1 | Skill distribution | `dependency` |
| `microsoft/skills` | 1 | Agent Skills + MCP | `curated-install` |
| `modelcontextprotocol/servers` | 1 | Official MCP reference servers | `reference-and-pin` |
| `NVIDIA/NeMo-Agent-Toolkit` | 2 | Multi-agent framework | `evaluate-before-adoption` |

## Tier 1 rule

Tier 1 does **not** mean clone, fork, or copy the entire repository into Ananas.

Allowed integration patterns:

- install selected skills;
- depend on released packages where appropriate;
- adapt reference implementations behind Ananas-owned interfaces;
- pin reviewed commit/version identifiers;
- maintain provenance and license metadata;
- update deliberately through reviewable pull requests.

Avoid:

- subtree copies with no update path;
- unreviewed scripts running with broad credentials;
- duplicating upstream source only to make minor local changes;
- binding Ananas core contracts to one vendor's internal API.

## Tier 2 rule

`NVIDIA/NeMo-Agent-Toolkit` remains outside the Ananas core until a benchmark demonstrates a material advantage over the existing lightweight orchestration path.

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

## Supply-chain controls

Before promoting or updating an upstream component:

1. Review its current license and transitive dependencies.
2. Review the exact pinned diff from the previously approved version.
3. Run relevant tests/benchmarks.
4. Scan for credential, network, filesystem, subprocess, and code-execution behavior.
5. Restrict permissions to the minimum required by the selected skill/tool.
6. Record the approved pin in `config/upstreams.yaml`.
7. Prefer an adapter boundary so a component can be removed without rewriting product logic.

## Current pins — 2026-08-15

- `NVIDIA/skills` → `a9130c6036de4603499924a3f2687cb6c42101ca`
- `vercel-labs/skills` → `c6f69c631292444cc541ac6d91e2226b0ff247da`
- `microsoft/skills` → `e20084b9d230c6f3b46ce36f011e6c3e50f79f8a`
- `modelcontextprotocol/servers` → `76d64c822f5125032f89eb71dbdb94e42b434821`
- `NVIDIA/NeMo-Agent-Toolkit` (`develop`) → `a35d30cdaf2327e93cb9b47e0ddb447e1d64f523`

These are provenance pins, not automatic permission to import every component at those revisions.
