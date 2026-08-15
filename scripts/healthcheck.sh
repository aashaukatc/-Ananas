#!/usr/bin/env bash
set -Eeuo pipefail

fail=0
check_cmd() {
  local cmd="$1"
  if command -v "$cmd" >/dev/null 2>&1; then
    printf '✓ %-10s %s\n' "$cmd" "$($cmd --version 2>/dev/null | head -n 1 || true)"
  else
    printf '✗ %-10s missing\n' "$cmd"
    fail=1
  fi
}

printf '🍍 Ananas workspace health check\n\n'
check_cmd git
check_cmd gh
check_cmd python3
check_cmd node
check_cmd npm
check_cmd curl

printf '\nProvider credentials:\n'
[[ -n "${NVIDIA_API_KEY:-}" ]] && echo '✓ NVIDIA_API_KEY available' || echo '○ NVIDIA_API_KEY not set'
[[ -n "${OPENROUTER_API_KEY:-}" ]] && echo '✓ OPENROUTER_API_KEY available' || echo '○ OPENROUTER_API_KEY not set'

printf '\nRepository:\n'
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf '✓ Git repository: %s\n' "$(git config --get remote.origin.url || echo local)"
else
  echo '✗ Not inside a Git repository'
  fail=1
fi

if (( fail != 0 )); then
  echo '\nHealth check failed.' >&2
  exit 1
fi

echo '\nCore workspace is healthy.'
