# Security Policy

## Repository scope

Ananas is a public repository. Do not place credentials, tokens, private keys, PHI, patient/client records, proprietary source material, or other confidential information in Issues, Pull Requests, commits, workflow logs, Figma examples, benchmark fixtures, or repository files.

The current Phase-1 scope and delivery gates are defined in `docs/SCOPE.md` and `docs/DELIVERY_LIFECYCLE.md`.

## Secrets

Use GitHub Codespaces secrets, GitHub Actions secrets, Google Cloud secret-management facilities, or protected runtime environment variables as appropriate.

Never commit:

- NVIDIA or OpenRouter API keys;
- GitHub personal access tokens;
- Google Cloud service-account private keys;
- `.env` files containing credentials;
- SSH/private signing keys;
- production database credentials;
- third-party connector tokens;
- copied credential files from fetched upstream projects.

If a secret is committed, treat it as compromised even if the commit is later deleted. Revoke/rotate it first, then remove it from repository history where necessary.

## Product data boundaries

### Ananas Core

Phase-1 Ananas Core is **not a PHI ingestion product**. Project/file/context implementations must define allowed data classes before expanding beyond the current scope.

At minimum:

- project/tenant identifiers must scope storage and retrieval;
- source indexing must not leak content across projects;
- artifact access must inherit the correct project/tenant boundary;
- tool/skill execution must receive only the minimum required data;
- provider/model requests must not silently include unrelated project context;
- logs/telemetry must avoid capturing secrets or sensitive file contents by default.

### DIRT No-PHI intelligence path

DIRT's initial No-PHI path must reject/quarantine prohibited identifiers **before** model/intelligence processing. Removing obvious identifiers after a model call is not an acceptable boundary.

See `docs/DIRT_VERTICAL.md` for the prohibited payload categories and exact audit objects.

Do not claim legal/contractual de-identification compliance without a formal privacy/security review of the implemented pipeline.

### Prototype data

Figma and other prototype fixtures use synthetic/fake data. Never place real patient/client data in a prototype to make it look realistic.

## Tool / execution security

- Sandboxed execution must have explicit filesystem, network, subprocess, and secret boundaries.
- Read-only analysis and irreversible external actions require different permission profiles.
- High-impact operations require explicit policy/approval controls.
- Retry loops must be bounded; uncontrolled retries are both reliability and cost risks.
- Provider credentials remain server-side and must not be exposed to browser/client code.

## Upstream supply-chain boundary

Canonical upstream policy/pins live in `config/upstreams.yaml`.

Reviewed source may be fetched with:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

Fetched source is placed in `.ananas/upstreams/`, which is Git-ignored.

Important: **fetched does not mean trusted to execute.** Before promoting an upstream skill/tool/package:

1. review the exact pin and license;
2. inspect credential/network/filesystem/subprocess/code-execution behavior;
3. restrict permissions;
4. run relevant tests/benchmarks;
5. wrap it behind an Ananas-owned adapter where practical;
6. record provenance/version/permission scope.

`NVIDIA/NeMo-Agent-Toolkit` is Tier 2 and must not become a core dependency before its benchmark/adoption gate passes.

## Vulnerability reporting

For security-sensitive findings, avoid publishing exploit details, secrets, PHI, or private data in a public Issue. Contact the repository owner privately through an appropriate GitHub-supported private channel when available.

## Dependency and CI policy

- Pin or deliberately version critical dependencies.
- Keep CI permissions at the minimum required level.
- Review third-party GitHub Actions before adding them.
- Prefer short-lived identity federation/workload identity over persistent cloud credentials.
- Do not expose development services publicly unless the use case explicitly requires it.
- Keep code-server and local gateways localhost-bound when that is the documented deployment model.
- Treat a successful build as necessary but insufficient evidence for MVP or security readiness.
