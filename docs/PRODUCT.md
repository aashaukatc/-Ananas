# Ananas Product Surface

## Purpose
The web surface is an operational control plane for a cloud-native autonomous software engineering workspace. It complements VS Code/Continue rather than replacing the editor.

## Primary screens
- Overview: workspace health, model routing, task stream, upstream registry, cost guard.
- Tasks: autonomous jobs, execution state, retries, logs, artifacts.
- Agents: agent roles, permissions, tools, memory boundaries.
- Models: NVIDIA primary, OpenRouter fallback, latency/cost/reliability.
- Skills: installed portable skills, provenance, version, update status.
- Benchmarks: reproducible brownfield coding evaluations.
- Deployments: GCP targets and production-like validation.
- Settings: secrets references, policies, budgets, upstream controls.

## Frontend
Next.js 16.2 + React 19 + Tailwind CSS 4.3. Dark-first Ananas token system. Server components by default; client components only where interaction is required.

## Backend
Start with route handlers for health/status. Provider credentials remain server-side or in Codespaces secrets. Model traffic should flow through the local LiteLLM gateway; the UI must never expose provider API keys.

## UX flow
Open workspace → inspect health → create autonomous task → select policy/agent → execute through Continue/LiteLLM → observe task/log state → review result → benchmark or deploy → persist decisions in GitHub.

## Upstream policy
Do not vendor entire repositories by default. Use skills installers for Agent Skills, MCP configuration for tool servers, package managers for SDKs, and forks only when contributing upstream.
