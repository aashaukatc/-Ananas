# Security Policy

## Scope

Ananas is a public repository. Do not place credentials, tokens, private keys, patient/client data, proprietary source material, or other confidential information in issues, pull requests, commits, workflow logs, or repository files.

## Secrets

Use GitHub Codespaces secrets, GitHub Actions secrets, Google Cloud secret-management facilities, or runtime environment variables as appropriate.

Never commit:

- NVIDIA or OpenRouter API keys
- GitHub personal access tokens
- Google Cloud service-account private keys
- `.env` files containing credentials
- SSH/private signing keys
- production database credentials

If a secret is committed, treat it as compromised even if the commit is later deleted. Revoke/rotate it first, then remove it from repository history where necessary.

## Vulnerability Reporting

For security-sensitive findings, avoid publishing exploit details in a public issue. Contact the repository owner privately through an appropriate GitHub-supported private channel when available.

## Dependency and CI Policy

- Pin or deliberately version critical dependencies.
- Keep CI permissions at the minimum required level.
- Review third-party GitHub Actions before adding them.
- Prefer short-lived identity federation over persistent cloud credentials.
- Do not expose development services publicly unless the use case explicitly requires it.
