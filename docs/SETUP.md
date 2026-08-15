# 🍍 Ananas Setup

Ananas uses a **Codespaces-first** development model with an optional hardened Google Compute Engine workspace. Each path is staged so it can be validated before autonomous coding is enabled.

## Path A — GitHub Codespaces

### Step 1 — Create the Codespace

From the repository page, select:

**Code → Codespaces → Create codespace on main**

Wait for the Dev Container initialization to finish.

### Step 2 — Verify the Workspace

Run:

```bash
bash scripts/healthcheck.sh
```

The core workspace should report Git, GitHub CLI, Python, Node.js, npm, and curl as available.

Provider credentials may still show as not set at this stage; that is expected.

### Step 3 — Add Provider Secrets

Add these through GitHub Codespaces secrets rather than repository files:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

Do not paste real credentials into `.env.example`, issues, commits, or any other public repository surface.

### Step 4 — Continue Configuration

The Dev Container post-create step copies:

```text
config/continue/config.yaml.example
```

to:

```text
~/.continue/config.yaml
```

when a local Continue configuration does not already exist.

The Codespaces template exposes two selectable direct routes:

1. NVIDIA Nemotron as the primary route
2. OpenRouter Nemotron as the alternate route

### Step 5 — Validate AI Connectivity

After the secrets are available to the Codespace/Continue runtime:

1. Open Continue in VS Code.
2. Select the NVIDIA model.
3. Ask for a small deterministic code task.
4. Confirm the response succeeds.
5. Repeat with the OpenRouter route.

Do not proceed to autonomous multi-file changes until the repository health check and at least one model route work reliably.

---

## Path B — Google Compute Engine Persistent Workspace

Google Cloud is not required for initial development. Use this path when you need persistent infrastructure, production-like Linux services, deployment testing, networking/IAM validation, or a workspace that survives Codespace shutdown.

### Step 1 — Provision the VM

Use an Ubuntu 22.04+ Compute Engine VM. A lightweight general-purpose VM is sufficient because model inference is remote; no GCP GPU is required for the Ananas control plane.

### Step 2 — Clone Ananas

```bash
git clone https://github.com/aashaukatc/-Ananas.git
cd -Ananas
```

### Step 3 — Run the Production Bootstrap

Supply one or both provider keys as environment variables, or enter them when prompted:

```bash
bash scripts/ananas-gcp-bootstrap.sh
```

The script installs and configures:

- Node.js and Python tooling
- code-server
- Continue
- LiteLLM in an isolated Python virtual environment
- NVIDIA Nemotron as the primary route
- OpenRouter as automatic fallback when both keys are present
- a localhost-only systemd-managed AI gateway
- a one-command inference health check

### Step 4 — Connect Securely

Do **not** expose code-server or the LiteLLM gateway directly to the public internet.

From your local machine:

```bash
gcloud compute ssh YOUR_VM_NAME --zone=YOUR_ZONE -- -L 8080:127.0.0.1:8080
```

Then open:

```text
http://127.0.0.1:8080
```

The bootstrap binds:

```text
code-server  -> 127.0.0.1:8080
LiteLLM      -> 127.0.0.1:4000
```

### Step 5 — Run the End-to-End AI Health Check

```bash
~/.local/bin/ananas-healthcheck
```

A healthy configured route should return:

```text
ANANAS_OK
```

For gateway logs:

```bash
sudo journalctl -u ananas-gateway -f
```

For IDE logs:

```bash
sudo journalctl -u code-server@$USER -f
```

---

## Model Benchmark

Before promoting a model to the default autonomous coding backbone, run the reproducible benchmark defined at:

```text
benchmarks/nemotron-vs-frontier.md
```

The benchmark compares correctness, concurrency handling, tests, autonomy, latency, tokens, and cost under the same repository and prompt conditions.

## Operating Rule

Use resources in this order:

1. GitHub Codespaces for normal interactive development.
2. Remote NVIDIA/OpenRouter inference for AI reasoning.
3. Google Cloud only when persistence, deployment, or infrastructure behavior requires it.
4. Paid compute/inference only when task success or reliability justifies it.
