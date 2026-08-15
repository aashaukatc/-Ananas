#!/usr/bin/env bash
set -Eeuo pipefail

printf '🍍 Bootstrapping Ananas workspace...\n'

mkdir -p src tests benchmarks/results

required=(git python3 node npm)
missing=()
for cmd in "${required[@]}"; do
  command -v "$cmd" >/dev/null 2>&1 || missing+=("$cmd")
done

if (( ${#missing[@]} > 0 )); then
  printf 'Missing required commands: %s\n' "${missing[*]}" >&2
  exit 1
fi

printf 'Git:    %s\n' "$(git --version)"
printf 'Python: %s\n' "$(python3 --version)"
printf 'Node:   %s\n' "$(node --version)"
printf 'npm:    %s\n' "$(npm --version)"
printf 'Bootstrap complete.\n'
