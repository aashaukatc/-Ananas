#!/usr/bin/env bash
set -Eeuo pipefail

printf '\n🍍 Ananas Codespace bootstrap\n'

mkdir -p "$HOME/.continue"

if [[ ! -f "$HOME/.continue/config.yaml" && -f "config/continue/config.yaml.example" ]]; then
  cp config/continue/config.yaml.example "$HOME/.continue/config.yaml"
  echo "Created ~/.continue/config.yaml from the repository template."
fi

bash scripts/bootstrap.sh
bash scripts/sync-continue-secrets.sh

printf '\nReady. Run: bash scripts/healthcheck.sh\n'
