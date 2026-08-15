#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# Ananas bootstrap
# Target: Ubuntu 22.04+ on a Google Compute Engine VM
# Installs: Node.js 22, Python tooling, code-server, Continue, LiteLLM gateway
# Routing: NVIDIA NIM primary -> OpenRouter fallback (when both keys are supplied)

log()  { printf '\n\033[1;36m[Ananas]\033[0m %s\n' "$*"; }
warn() { printf '\n\033[1;33m[warning]\033[0m %s\n' "$*" >&2; }
die()  { printf '\n\033[1;31m[error]\033[0m %s\n' "$*" >&2; exit 1; }

[[ "${EUID}" -ne 0 ]] || die "Run this as your normal VM user, not root. The script will use sudo where required."
command -v sudo >/dev/null 2>&1 || die "sudo is required."
sudo -v

USER_NAME="$(id -un)"
USER_HOME="${HOME}"
NODE_MAJOR="${ANANAS_NODE_MAJOR:-22}"
NVIDIA_MODEL="${ANANAS_NVIDIA_MODEL:-nvidia/nemotron-3-ultra-550b-a55b}"
OPENROUTER_MODEL="${ANANAS_OPENROUTER_MODEL:-nvidia/nemotron-3-ultra-550b-a55b:free}"
ALLOW_NO_KEYS="${ANANAS_ALLOW_NO_KEYS:-0}"

NVIDIA_API_KEY="${NVIDIA_API_KEY:-}"
OPENROUTER_API_KEY="${OPENROUTER_API_KEY:-}"

if [[ -t 0 ]]; then
  if [[ -z "${NVIDIA_API_KEY}" ]]; then
    read -r -s -p "NVIDIA API key (Enter to skip): " NVIDIA_API_KEY || true
    printf '\n'
  fi
  if [[ -z "${OPENROUTER_API_KEY}" ]]; then
    read -r -s -p "OpenRouter API key (Enter to skip): " OPENROUTER_API_KEY || true
    printf '\n'
  fi
fi

if [[ -z "${NVIDIA_API_KEY}" && -z "${OPENROUTER_API_KEY}" && "${ALLOW_NO_KEYS}" != "1" ]]; then
  die "No API key supplied. Export NVIDIA_API_KEY and/or OPENROUTER_API_KEY, or rerun with ANANAS_ALLOW_NO_KEYS=1 for infrastructure-only setup."
fi

log "Installing base packages"
sudo apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  ca-certificates curl git build-essential jq unzip openssl \
  python3 python3-venv python3-pip gnupg lsb-release

log "Installing Node.js ${NODE_MAJOR}.x if needed"
NEED_NODE=1
if command -v node >/dev/null 2>&1; then
  CURRENT_NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
  if [[ "${CURRENT_NODE_MAJOR}" -ge 18 ]]; then
    NEED_NODE=0
  fi
fi
if [[ "${NEED_NODE}" -eq 1 ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
fi
node --version
npm --version

log "Installing code-server"
if ! command -v code-server >/dev/null 2>&1; then
  curl -fsSL https://code-server.dev/install.sh | sh
fi
code-server --version

log "Hardening code-server for SSH/IAP tunneling only"
CODE_SERVER_DIR="${USER_HOME}/.config/code-server"
CODE_SERVER_CFG="${CODE_SERVER_DIR}/config.yaml"
mkdir -p "${CODE_SERVER_DIR}"
chmod 700 "${CODE_SERVER_DIR}"

if [[ -f "${CODE_SERVER_CFG}" ]] && grep -q '^password:' "${CODE_SERVER_CFG}"; then
  CODE_SERVER_PASSWORD="$(awk -F': ' '/^password:/ {print $2; exit}' "${CODE_SERVER_CFG}")"
else
  CODE_SERVER_PASSWORD="$(openssl rand -hex 18)"
fi

cat > "${CODE_SERVER_CFG}" <<EOF_CFG
bind-addr: 127.0.0.1:8080
auth: password
password: ${CODE_SERVER_PASSWORD}
cert: false
EOF_CFG
chmod 600 "${CODE_SERVER_CFG}"

sudo systemctl enable --now "code-server@${USER_NAME}.service"

log "Installing Continue and baseline editor extensions"
install_extension() {
  local ext="$1"
  if code-server --list-extensions 2>/dev/null | grep -qi "^${ext}$"; then
    return 0
  fi
  if ! code-server --install-extension "${ext}"; then
    warn "Could not install extension ${ext}; continue with the remaining setup."
    return 1
  fi
}

install_extension "Continue.continue" || warn "Continue may need manual VSIX installation if your Open VSX mirror does not expose it."
install_extension "redhat.vscode-yaml" || true
install_extension "dbaeumer.vscode-eslint" || true
install_extension "esbenp.prettier-vscode" || true

log "Installing LiteLLM gateway in an isolated Python virtual environment"
ANANAS_ROOT="${USER_HOME}/.local/share/ananas"
ANANAS_CONFIG="${USER_HOME}/.config/ananas"
LITELLM_VENV="${ANANAS_ROOT}/venv"
mkdir -p "${ANANAS_ROOT}" "${ANANAS_CONFIG}" "${USER_HOME}/.continue" "${USER_HOME}/.local/bin"
chmod 700 "${ANANAS_CONFIG}" "${USER_HOME}/.continue"

if [[ ! -x "${LITELLM_VENV}/bin/python" ]]; then
  python3 -m venv "${LITELLM_VENV}"
fi
"${LITELLM_VENV}/bin/pip" install --upgrade pip setuptools wheel
"${LITELLM_VENV}/bin/pip" install --upgrade 'litellm[proxy]'

GATEWAY_KEY="sk-$(openssl rand -hex 30)"
GATEWAY_ENV="${ANANAS_CONFIG}/gateway.env"
LITELLM_CFG="${ANANAS_CONFIG}/litellm.yaml"

{
  printf 'LITELLM_MASTER_KEY=%s\n' "${GATEWAY_KEY}"
  [[ -n "${NVIDIA_API_KEY}" ]] && printf 'NVIDIA_NIM_API_KEY=%s\n' "${NVIDIA_API_KEY}"
  [[ -n "${OPENROUTER_API_KEY}" ]] && printf 'OPENROUTER_API_KEY=%s\n' "${OPENROUTER_API_KEY}"
} > "${GATEWAY_ENV}"
chmod 600 "${GATEWAY_ENV}"

if [[ -n "${NVIDIA_API_KEY}" && -n "${OPENROUTER_API_KEY}" ]]; then
  cat > "${LITELLM_CFG}" <<EOF_LITELLM
model_list:
  - model_name: ananas-primary
    litellm_params:
      model: nvidia_nim/${NVIDIA_MODEL}
      api_key: os.environ/NVIDIA_NIM_API_KEY
      api_base: https://integrate.api.nvidia.com/v1
  - model_name: ananas-openrouter
    litellm_params:
      model: openrouter/${OPENROUTER_MODEL}
      api_key: os.environ/OPENROUTER_API_KEY

router_settings:
  fallbacks: [{"ananas-primary": ["ananas-openrouter"]}]
  num_retries: 1

litellm_settings:
  request_timeout: 600

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
EOF_LITELLM
elif [[ -n "${NVIDIA_API_KEY}" ]]; then
  cat > "${LITELLM_CFG}" <<EOF_LITELLM
model_list:
  - model_name: ananas-primary
    litellm_params:
      model: nvidia_nim/${NVIDIA_MODEL}
      api_key: os.environ/NVIDIA_NIM_API_KEY
      api_base: https://integrate.api.nvidia.com/v1

router_settings:
  num_retries: 1

litellm_settings:
  request_timeout: 600

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
EOF_LITELLM
elif [[ -n "${OPENROUTER_API_KEY}" ]]; then
  cat > "${LITELLM_CFG}" <<EOF_LITELLM
model_list:
  - model_name: ananas-primary
    litellm_params:
      model: openrouter/${OPENROUTER_MODEL}
      api_key: os.environ/OPENROUTER_API_KEY

router_settings:
  num_retries: 1

litellm_settings:
  request_timeout: 600

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
EOF_LITELLM
else
  cat > "${LITELLM_CFG}" <<'EOF_LITELLM'
model_list: []
EOF_LITELLM
fi
chmod 600 "${LITELLM_CFG}"

log "Creating the localhost-only LiteLLM systemd service"
SERVICE_FILE="/etc/systemd/system/ananas-gateway.service"
sudo tee "${SERVICE_FILE}" >/dev/null <<EOF_SERVICE
[Unit]
Description=Ananas LiteLLM Gateway
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${USER_NAME}
Group=$(id -gn)
WorkingDirectory=${USER_HOME}
EnvironmentFile=${GATEWAY_ENV}
ExecStart=${LITELLM_VENV}/bin/litellm --config ${LITELLM_CFG} --host 127.0.0.1 --port 4000
Restart=on-failure
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF_SERVICE

sudo systemctl daemon-reload
if [[ -n "${NVIDIA_API_KEY}" || -n "${OPENROUTER_API_KEY}" ]]; then
  sudo systemctl enable --now ananas-gateway.service
else
  warn "No provider keys supplied: gateway service created but not started."
fi

log "Configuring Continue with secret indirection"
CONTINUE_ENV="${USER_HOME}/.continue/.env"
CONTINUE_CFG="${USER_HOME}/.continue/config.yaml"
printf 'ANANAS_GATEWAY_KEY=%s\n' "${GATEWAY_KEY}" > "${CONTINUE_ENV}"
chmod 600 "${CONTINUE_ENV}"

cat > "${CONTINUE_CFG}" <<'EOF_CONTINUE'
name: Ananas
version: 1.0.0
schema: v1

models:
  - name: Ananas Nemotron
    provider: openai
    model: ananas-primary
    apiBase: http://127.0.0.1:4000/v1
    apiKey: ${{ secrets.ANANAS_GATEWAY_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use
EOF_CONTINUE
chmod 600 "${CONTINUE_CFG}"

log "Creating a one-command health check"
cat > "${USER_HOME}/.local/bin/ananas-healthcheck" <<'EOF_HEALTH'
#!/usr/bin/env bash
set -Eeuo pipefail
KEY="$(awk -F= '/^ANANAS_GATEWAY_KEY=/{print substr($0,index($0,"=")+1)}' "$HOME/.continue/.env")"
RESP="$(curl -fsS --max-time 180 \
  -H "Authorization: Bearer ${KEY}" \
  -H 'Content-Type: application/json' \
  http://127.0.0.1:4000/v1/chat/completions \
  -d '{"model":"ananas-primary","messages":[{"role":"user","content":"Reply with exactly ANANAS_OK"}],"max_tokens":32}')"
printf '%s\n' "${RESP}" | jq -r '.choices[0].message.content // .error.message // .'
EOF_HEALTH
chmod 700 "${USER_HOME}/.local/bin/ananas-healthcheck"

# Ensure ~/.local/bin is present for future shells.
if ! grep -q 'HOME/.local/bin' "${USER_HOME}/.profile" 2>/dev/null; then
  cat >> "${USER_HOME}/.profile" <<'EOF_PROFILE'

# Ananas
if [ -d "$HOME/.local/bin" ]; then
  PATH="$HOME/.local/bin:$PATH"
fi
EOF_PROFILE
fi

log "Final service checks"
sudo systemctl --no-pager --full status "code-server@${USER_NAME}.service" | sed -n '1,8p' || true
if [[ -n "${NVIDIA_API_KEY}" || -n "${OPENROUTER_API_KEY}" ]]; then
  sudo systemctl --no-pager --full status ananas-gateway.service | sed -n '1,10p' || true
  sleep 2
  "${USER_HOME}/.local/bin/ananas-healthcheck" || warn "Gateway is running, but the provider health check did not complete successfully. Check: sudo journalctl -u ananas-gateway -n 100 --no-pager"
fi

cat <<EOF_DONE

============================================================
 Ananas is installed.
============================================================

Security model:
  code-server : 127.0.0.1:8080 only
  AI gateway  : 127.0.0.1:4000 only
  Public HTTP/HTTPS firewall rules are NOT required.

From your LOCAL machine, connect with:
  gcloud compute ssh YOUR_VM_NAME --zone=YOUR_ZONE -- -L 8080:127.0.0.1:8080

Then open:
  http://127.0.0.1:8080

Retrieve the code-server password on the VM with:
  awk -F': ' '/^password:/ {print \$2}' ~/.config/code-server/config.yaml

Health check:
  ~/.local/bin/ananas-healthcheck

Continue config:
  ~/.continue/config.yaml

Provider routing:
  NVIDIA model    : ${NVIDIA_MODEL:-not-configured}
  OpenRouter model: ${OPENROUTER_MODEL:-not-configured}

Legacy 253B option:
  ANANAS_NVIDIA_MODEL=nvidia/llama-3.1-nemotron-ultra-253b-v1 bash scripts/ananas-gcp-bootstrap.sh

Useful logs:
  sudo journalctl -u ananas-gateway -f
  sudo journalctl -u code-server@${USER_NAME} -f
============================================================
EOF_DONE
