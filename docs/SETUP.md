# 🍍 Ananas Setup

Ananas uses a **Codespaces-first** development model with an optional hardened Google Compute Engine workspace. These are development/runtime environments underneath the product; they are not the Ananas product definition.

## Path A — GitHub Codespaces

### Step 1 — Create the Codespace

From the repository page, select:

**Code → Codespaces → Create codespace on main**

Wait for the Dev Container initialization to finish.

### Step 2 — Verify the workspace

Run:

```bash
bash scripts/healthcheck.sh
bash scripts/upstreams/validate-registry.sh
```

The core workspace should report Git, GitHub CLI, Python, Node.js, npm, and curl as available, and the canonical upstream registry should report 4 Tier-1 + 1 Tier-2 with valid pins.

Provider credentials may still show as not set at this stage; that is expected.

### Step 3 — Add provider secrets

Add these through GitHub Codespaces secrets rather than repository files:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

Do not paste real credentials into `.env.example`, Issues, commits, Figma, or any other public repository surface.

### Step 4 — Continue configuration

The Dev Container post-create step copies:

```text
config/continue/config.yaml.example
```

to:

```text
~/.continue/config.yaml
```

when a local Continue configuration does not already exist.

The Codespaces template exposes selectable provider routes for development work.

### Step 5 — Validate AI connectivity

After the secrets are available to the Codespace/Continue runtime:

1. Open Continue in VS Code.
2. Select the NVIDIA route.
3. Run a small deterministic task.
4. Confirm the response succeeds and capture the result as PoC evidence.
5. Repeat with the OpenRouter route.

Provider connectivity is a **PoC gate**, not proof that the Ananas MVP is complete.

### Step 6 — Fetch reviewed upstream source when needed

The five canonical upstream repositories are **not vendored into Ananas**. Fetch their exact reviewed revisions into the local Git-ignored source cache:

```bash
bash scripts/upstreams/fetch-pinned.sh
```

The cache lives at:

```text
.ananas/upstreams/
```

Use this source to inspect, benchmark, adapt, or install selected capabilities before writing duplicates. Do not commit the cache and do not execute an upstream component merely because it was fetched.

---

## Path B — Google Compute Engine Persistent Workspace

Google Cloud is not required for initial development. Use this path when you need persistent infrastructure, production-like Linux services, deployment testing, networking/IAM validation, or a workspace that survives Codespace shutdown.

### Step 1 — Provision the VM

Use an Ubuntu 22.04+ Compute Engine VM. A lightweight general-purpose VM is sufficient because model inference is remote; no GCP GPU is required for the Ananas control plane by default.

### Step 2 — Clone Ananas

```bash
git clone https://github.com/aashaukatc/-Ananas.git
cd -Ananas
```

### Step 3 — Run the production-like bootstrap

Supply one or both provider keys as protected environment variables, or enter them when prompted:

```bash
bash scripts/ananas-gcp-bootstrap.sh
```

The script installs/configures the development/runtime foundation, including code-server, Continue, LiteLLM, provider routing, localhost bindings, and an inference health check.

### Step 4 — Connect securely

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

### Step 5 — Run the end-to-end AI health check

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

### Step 6 — Reuse the same upstream pins

From the repository clone:

```bash
bash scripts/upstreams/validate-registry.sh
bash scripts/upstreams/fetch-pinned.sh
```

Do not maintain a second GCP-specific upstream copy or pin list.

---

## Product app shell

The current Next.js app is the chat-first product shell aligned to the active Figma prototype.

```bash
npm install
npm run dev
```

A successful visual shell is **Prototype/MVP-scaffold evidence only**. Persistence, files/retrieval, artifacts, tools, sandboxing, provider calls, API, isolation, and telemetry still require their real implementation/acceptance tests.

## Model / orchestration benchmarks

Before promoting a model or orchestration framework to a default production path, use reproducible evaluation rather than marketing claims.

Current benchmark material starts under:

```text
benchmarks/
```

`NVIDIA/NeMo-Agent-Toolkit` remains Tier 2 until benchmark evidence justifies adoption.

## Operating rule

Use resources in this order:

1. GitHub Codespaces for normal interactive development.
2. Existing Ananas code + reviewed upstream source before net-new frameworks.
3. Remote NVIDIA/OpenRouter inference through the provider abstraction.
4. Google Cloud only when persistence, deployment, or infrastructure behavior requires it.
5. Paid compute/inference only when task success/reliability/context needs justify it.
