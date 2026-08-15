# Contributing to 🍍 Ananas

## Development Flow

1. Work from an up-to-date `main` branch.
2. Create a focused branch for non-trivial changes.
3. Keep commits small and descriptive.
4. Run the repository validation locally before opening a pull request:

```bash
bash scripts/healthcheck.sh
find scripts .devcontainer -type f -name '*.sh' -print0 | xargs -0 -r -n1 bash -n
```

5. Open a pull request describing the problem, solution, tests, and any cost/security implications.

## Engineering Rules

- Never commit secrets.
- Prefer reproducible configuration over manual setup.
- Avoid adding infrastructure until a real requirement justifies it.
- Keep provider/model identifiers configurable.
- Add tests for behavior changes.
- Document architecture-changing decisions.
- Prefer boring, maintainable components over unnecessary framework layers.

## Commit Style

Use short conventional-style prefixes where practical:

- `feat:` new behavior
- `fix:` bug correction
- `docs:` documentation
- `test:` tests
- `ci:` CI/CD changes
- `chore:` maintenance
- `refactor:` internal code restructuring

## Pull Request Standard

A pull request should state:

- **Why** the change is required
- **What** changed
- **How** it was validated
- **Risk** introduced or reduced
- **Cost impact** if the change affects cloud or inference resources
