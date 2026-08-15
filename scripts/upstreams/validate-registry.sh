#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REGISTRY="${ROOT_DIR}/config/upstreams.yaml"

fail() { echo "upstream-registry: $*" >&2; exit 1; }

[[ -f "${REGISTRY}" ]] || fail "missing ${REGISTRY}"

expected=(
  "NVIDIA/skills"
  "vercel-labs/skills"
  "microsoft/skills"
  "modelcontextprotocol/servers"
  "NVIDIA/NeMo-Agent-Toolkit"
)

repo_count="$(grep -c '^  - repository: ' "${REGISTRY}" || true)"
tier1_count="$(grep -c '^    tier: 1$' "${REGISTRY}" || true)"
tier2_count="$(grep -c '^    tier: 2$' "${REGISTRY}" || true)"

[[ "${repo_count}" == "5" ]] || fail "expected 5 canonical upstreams, found ${repo_count}"
[[ "${tier1_count}" == "4" ]] || fail "expected 4 Tier-1 upstreams, found ${tier1_count}"
[[ "${tier2_count}" == "1" ]] || fail "expected 1 Tier-2 upstream, found ${tier2_count}"

if grep -q '^    vendor: true$' "${REGISTRY}"; then
  fail "whole-repository vendoring is prohibited by the canonical registry"
fi

for repo in "${expected[@]}"; do
  grep -Fq "  - repository: ${repo}" "${REGISTRY}" || fail "missing canonical upstream: ${repo}"
done

while IFS= read -r line; do
  pin="${line#*pin: }"
  [[ "${pin}" =~ ^[0-9a-fA-F]{40}$ ]] || fail "invalid pin: ${pin}"
done < <(grep '^    pin: ' "${REGISTRY}")

pin_count="$(grep -c '^    pin: ' "${REGISTRY}" || true)"
provenance_count="$(grep -c '^    provenance: ' "${REGISTRY}" || true)"
license_count="$(grep -c '^    license_spdx: ' "${REGISTRY}" || true)"
license_review_count="$(grep -c '^    license_review: ' "${REGISTRY}" || true)"
security_review_count="$(grep -c '^    security_review: ' "${REGISTRY}" || true)"

[[ "${pin_count}" == "5" ]] || fail "expected 5 pins, found ${pin_count}"
[[ "${provenance_count}" == "5" ]] || fail "expected provenance metadata for all 5 upstreams, found ${provenance_count}"
[[ "${license_count}" == "5" ]] || fail "expected license_spdx metadata for all 5 upstreams, found ${license_count}"
[[ "${license_review_count}" == "5" ]] || fail "expected license_review metadata for all 5 upstreams, found ${license_review_count}"
[[ "${security_review_count}" == "5" ]] || fail "expected security_review metadata for all 5 upstreams, found ${security_review_count}"

grep -Fq 'repository: NVIDIA/NeMo-Agent-Toolkit' "${REGISTRY}" || fail "missing NeMo Agent Toolkit"
grep -Fq 'adoption_gate: benchmark-required' "${REGISTRY}" || fail "NeMo Agent Toolkit must retain benchmark-required adoption gate"
grep -A14 -F 'repository: modelcontextprotocol/servers' "${REGISTRY}" | grep -Fq 'license_review: repository-metadata-no-spdx-review-required-before-code-adoption' || fail "MCP reference-server license review must remain explicit"

echo "upstream-registry: valid (4 Tier-1 + 1 Tier-2, 5 pins, provenance/license/security metadata, vendoring disabled)"
