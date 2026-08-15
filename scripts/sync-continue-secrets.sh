#!/usr/bin/env bash
set -Eeuo pipefail

mkdir -p "$HOME/.continue"
umask 077

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

for name in NVIDIA_API_KEY OPENROUTER_API_KEY; do
  value="${!name:-}"
  if [[ -n "$value" ]]; then
    printf '%s=%s\n' "$name" "$value" >> "$tmp"
  fi
done

if [[ -s "$tmp" ]]; then
  mv "$tmp" "$HOME/.continue/.env"
  chmod 600 "$HOME/.continue/.env"
  trap - EXIT
  echo 'Continue secrets synchronized to ~/.continue/.env without printing secret values.'
else
  echo 'No provider secrets found in the Codespace environment; ~/.continue/.env was not changed.'
fi
