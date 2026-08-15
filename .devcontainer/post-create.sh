#!/usr/bin/env bash
set -Eeuo pipefail

printf '\n🍍 Ananas Codespace bootstrap\n'

mkdir -p "$HOME/.continue"

if [[ ! -f "$HOME/.continue/config.yaml" && -f "config/continue/config.yaml.example" ]]; then
  cp config/continue/config.yaml.example "$HOME/.continue/config.yaml"
  echo "Created ~/.continue/config.yaml from the repository template."
fi

if [[ -x scripts/bootstrap.sh ]]; then
  ./scripts/bootstrap.sh
fi

printf '\nReady. Run ./scripts/healthcheck.sh to verify the workspace.\n'
