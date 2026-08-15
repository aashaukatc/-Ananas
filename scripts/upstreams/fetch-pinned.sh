#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REGISTRY="${ROOT_DIR}/config/upstreams.yaml"
CACHE_DIR="${ANANAS_UPSTREAM_CACHE:-${ROOT_DIR}/.ananas/upstreams}"

if [[ ! -f "${REGISTRY}" ]]; then
  echo "Missing upstream registry: ${REGISTRY}" >&2
  exit 1
fi

mkdir -p "${CACHE_DIR}"

repo=""
tier=""
policy=""
pin=""

fetch_one() {
  local repository="$1"
  local revision="$2"
  local tier_value="$3"
  local policy_value="$4"
  local target="${CACHE_DIR}/${repository//\//__}"
  local remote="https://github.com/${repository}.git"

  if [[ ! "${revision}" =~ ^[0-9a-fA-F]{40}$ ]]; then
    echo "Invalid 40-character pin for ${repository}: ${revision}" >&2
    exit 1
  fi

  echo "==> ${repository}  tier=${tier_value}  policy=${policy_value}"

  if [[ ! -d "${target}/.git" ]]; then
    rm -rf "${target}"
    git init -q "${target}"
    git -C "${target}" remote add origin "${remote}"
  fi

  git -C "${target}" remote set-url origin "${remote}"
  git -C "${target}" fetch -q --depth=1 origin "${revision}"
  git -C "${target}" checkout -q --detach FETCH_HEAD

  local actual
  actual="$(git -C "${target}" rev-parse HEAD)"
  if [[ "${actual}" != "${revision}" ]]; then
    echo "Pin mismatch for ${repository}: expected ${revision}, got ${actual}" >&2
    exit 1
  fi

  printf '%s\n' "${repository}@${actual}" > "${target}/.ananas-pin"
  echo "    ready: ${target}"
}

while IFS= read -r line || [[ -n "${line}" ]]; do
  case "${line}" in
    "  - repository: "*)
      repo="${line#*repository: }"
      tier=""
      policy=""
      pin=""
      ;;
    "    tier: "*)
      tier="${line#*tier: }"
      ;;
    "    policy: "*)
      policy="${line#*policy: }"
      ;;
    "    pin: "*)
      pin="${line#*pin: }"
      if [[ -z "${repo}" ]]; then
        echo "Registry pin encountered before repository name." >&2
        exit 1
      fi
      fetch_one "${repo}" "${pin}" "${tier:-unknown}" "${policy:-unknown}"
      repo=""
      ;;
  esac
done < "${REGISTRY}"

echo
echo "Pinned upstream cache is ready."
echo "Cache: ${CACHE_DIR}"
echo "These repositories are external reference/dependency material and must not be committed into Ananas."
