# 🍍 Ananas Setup

This setup is intentionally staged so each step can be verified before the next one.

## Step 1 — Create the Codespace

From the repository page, select:

**Code → Codespaces → Create codespace on main**

Wait for the Dev Container initialization to finish.

## Step 2 — Verify the Workspace

Run:

```bash
bash scripts/healthcheck.sh
```

The core workspace should report Git, GitHub CLI, Python, Node.js, npm, and curl as available.

Provider credentials may still show as not set at this stage; that is expected.

## Step 3 — Add Provider Secrets

Add these through GitHub Codespaces secrets rather than repository files:

```text
NVIDIA_API_KEY
OPENROUTER_API_KEY
```

Do not paste real credentials into `.env.example`, issues, commits, or chat logs intended for the public repository.

## Step 4 — Continue Configuration

The Dev Container post-create step copies:

```text
config/continue/config.yaml.example
```

to:

```text
~/.continue/config.yaml
```

when a local Continue configuration does not already exist.

The repository template exposes two selectable routes:

1. NVIDIA Nemotron as the primary route
2. OpenRouter Nemotron as the alternate route

Automatic cross-provider routing can be introduced later behind a local/provider gateway after direct connectivity is validated.

## Step 5 — Validate AI Connectivity

After the secrets are available to the Codespace/Continue runtime:

1. Open Continue in VS Code.
2. Select the NVIDIA model.
3. Ask for a small deterministic code task.
4. Confirm the response succeeds.
5. Repeat with the OpenRouter route.

Do not proceed to autonomous multi-file changes until both the repository health check and at least one model route work reliably.

## Step 6 — Google Cloud

Google Cloud is deliberately not required for initial development.

Use it only when the task requires one of the following:

- persistent infrastructure
- deployment testing
- public/private services
- cloud storage or databases
- production-like networking/IAM
- workloads that should survive Codespace shutdown

The first GCP task should be credit/account verification and a dedicated project boundary, not VM provisioning.
