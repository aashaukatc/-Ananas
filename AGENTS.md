# Ananas Agent Guidance

- GitHub is the source of truth.
- Prefer Codespaces for interactive work; use GCP for persistent or production-like workloads.
- Route hosted inference through LiteLLM. NVIDIA is primary; OpenRouter is fallback.
- Never commit provider credentials, service-account JSON, tokens, or `.env` files.
- Prefer upstream reuse: Agent Skills via `npx skills`, MCP via registered servers, SDKs via package managers, forks only for intended upstream contribution.
- Before adding an upstream project, record provenance, license, integration type, version/pin, and security status in `upstream/registry.yaml`.
- Product UI follows `docs/BRAND.md` and `docs/PRODUCT.md`.
- Use the Ananas palette and avoid generic AI imagery or unsupported performance claims.
- Benchmark model changes before promoting them to the default route.
