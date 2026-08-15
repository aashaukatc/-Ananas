# GitHub Discussions / RFC Seed

When GitHub Discussions is enabled, use it for open-ended product and architecture decisions that benefit from debate before becoming implementation work.

## Recommended categories

- **Announcements** — releases, milestones, breaking architecture decisions
- **Product RFCs** — Ananas core and vertical product proposals
- **Architecture RFCs** — routing, context, artifacts, tools, execution, storage
- **Verticals** — DIRT, Continuara, and future domain packs
- **Upstream Evaluations** — skills/MCP/framework adoption evidence
- **Show & Tell** — demos, integrations, benchmark results
- **Q&A** — contributor/user questions

## Promotion flow

```text
Discussion / RFC
      ↓ accepted
Architecture or product spec update
      ↓
GitHub Issue with acceptance criteria
      ↓
Pull Request
      ↓
Benchmark / CI / review
      ↓
Merge
```

## Initial RFC topics

1. Artifact persistence/storage contract
2. Project memory and context-compaction strategy
3. Ananas-owned tool/skill adapter interface
4. DIRT No-PHI ingress enforcement design
5. NeMo Agent Toolkit adoption benchmark
6. Multi-tenant isolation model before hosted vertical deployment

Discussions are advisory until their outcome is reflected in version-controlled specifications and implementation issues.
