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

has_continue_secret() {
  local name="$1"
  if [[ -n "${!name:-}" ]]; then
    return 0
  fi
  [[ -f "$HOME/.continue/.env" ]] && grep -q "^${name}=" "$HOME/.continue/.env"
}

printf '🍍 Ananas workspace health check\n\n'
check_cmd git
check_cmd gh
check_cmd python3
check_cmd node
check_cmd npm
check_cmd curl

printf '\nProvider credentials for Continue:\n'
has_continue_secret NVIDIA_API_KEY && echo '✓ NVIDIA_API_KEY available' || echo '○ NVIDIA_API_KEY not configured'
has_continue_secret OPENROUTER_API_KEY && echo '✓ OPENROUTER_API_KEY available' || echo '○ OPENROUTER_API_KEY not configured'

printf '\nContinue configuration:\n'
[[ -f "$HOME/.continue/config.yaml" ]] && echo '✓ ~/.continue/config.yaml present' || echo '○ ~/.continue/config.yaml not present yet'

printf '\nRepository:\n'
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf '✓ Git repository: %s\n' "$(git config --get remote.origin.url || echo local)"
else
  echo '✗ Not inside a Git repository'
  fail=1
fi

if (( fail != 0 )); then
  printf '\nHealth check failed.\n' >&2
  exit 1
fi

printf '\nCore workspace is healthy.\n'
