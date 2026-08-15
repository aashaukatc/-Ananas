#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FIXTURE="${ROOT_DIR}/examples/vertical-packs/synthetic/manifest.yaml"

fail() { echo "synthetic-vertical-fixture: $*" >&2; exit 1; }

[[ -f "${FIXTURE}" ]] || fail "missing fixture manifest"

grep -Fq 'id: synthetic-vertical' "${FIXTURE}" || fail "unexpected fixture id"
grep -Fq 'production: false' "${FIXTURE}" || fail "fixture must never be marked production"
grep -Fq 'contains_real_domain_logic: false' "${FIXTURE}" || fail "fixture must remain domain-neutral"

for inherited in conversation projects files_context artifacts execution model_routing telemetry api; do
  grep -Eq "^  ${inherited}: inherit$" "${FIXTURE}" || fail "core contract ${inherited} must be inherited"
done

grep -Fq '  network: none' "${FIXTURE}" || fail "fixture network permission must remain none"
grep -Fq '  filesystem: none' "${FIXTURE}" || fail "fixture filesystem permission must remain none"
grep -Fq '  secrets: []' "${FIXTURE}" || fail "fixture must declare no secrets"
grep -Fq '  external_actions: none' "${FIXTURE}" || fail "fixture external actions must remain none"

if grep -Eiq 'patient|member[_ -]?id|medical[_ -]?record|mrn|ssn|phi:' "${FIXTURE}"; then
  fail "fixture manifest contains healthcare/patient-specific fields"
fi

echo "synthetic-vertical-fixture: valid (domain-neutral, no privileged permissions)"
