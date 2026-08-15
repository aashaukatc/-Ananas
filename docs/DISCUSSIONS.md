# GitHub Discussions / RFC Seed

When GitHub Discussions is enabled, use it for open-ended product and architecture decisions that benefit from debate before becoming implementation work.

## Recommended categories

- **Announcements** — releases, stage transitions, major architecture decisions
- **Product RFCs** — Ananas Core and vertical product proposals
- **Architecture RFCs** — routing, context, artifacts, tools, execution, storage
- **Verticals** — DIRT, Continuara, and future domain packs
- **Upstream Evaluations** — skills/MCP/framework reuse/adoption evidence
- **Show & Tell** — demos, prototypes, integrations, benchmark results
- **Q&A** — contributor/user questions

## Promotion flow

```text
Discussion / RFC
      ↓
Scope classification
(Core Phase 1 / vertical / deferred)
      ↓ accepted
Delivery Stage assigned
(PoC / Prototype / MVP / Pilot-Beta / Post-MVP)
      ↓
Product/architecture spec update if required
      ↓
GitHub Issue with stage-appropriate acceptance evidence
      ↓
Pull Request
      ↓
Tests / benchmark / prototype review / security review as applicable
      ↓
Merge
```

An RFC does not enter Phase-1 scope automatically. If it changes the boundary, `docs/SCOPE.md` must change deliberately.

## Initial RFC topics

1. Artifact persistence/storage contract
2. Project memory and context-compaction strategy
3. Ananas-owned tool/skill adapter interface
4. DIRT No-PHI ingress enforcement design
5. NeMo Agent Toolkit adoption benchmark
6. Multi-tenant isolation model before hosted vertical deployment
7. MVP identity/session approach (single supported path; social login deferred)
8. Pilot/Beta admission and reliability criteria after MVP acceptance

Discussions are advisory until their outcome is reflected in version-controlled specifications and implementation Issues.
