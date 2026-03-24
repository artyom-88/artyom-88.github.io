# artyom-88.github.io

[![codebeat badge](https://codebeat.co/badges/dd98a6ea-1863-4ddc-ac08-53922563ca20)](https://codebeat.co/projects/github-com-artyom-88-artyom-88-github-io-develop)

Frontend application for [artyom-88.github.io](https://artyom-88.github.io/). The backend API for the site lives in the [artemganev-be](https://github.com/artyom-88/artemganev-be) repository.

## Prerequisites

- Node.js 22 or newer
- pnpm 10 or newer

## Setup

1. Clone the repository.
2. Install dependencies with `pnpm install`.
3. Create `.env.local` from `.env.example`.

Example:

```bash
cp .env.example .env.local
pnpm install
```

By default the app runs at `https://localhost:8080`. `VITE_DOMAIN` and `VITE_PORT` control the local host and port.

## Common Commands

- `pnpm start`: run the local HTTPS Vite server.
- `pnpm build`: create a production bundle in `dist/`.
- `pnpm build:ci`: run TypeScript checks and the production build.
- `pnpm lint`: run Biome checks.
- `pnpm lint:fix`: apply Biome fixes.
- `pnpm test`: run Vitest tests once.
- `pnpm test:coverage`: run Vitest with coverage output.
- `pnpm test:e2e`: run Playwright end-to-end tests.
- `pnpm compromised:check`: verify the compromised-package allowlist.

## Project Structure

- `src/app`: app entry points and global styles.
- `src/common`: shared components, hooks, routes, constants, and utilities.
- `src/features`: feature modules such as `about`, `blog`, and `career`.
- `src/test`: Vitest helpers, script tests, and Playwright specs in `src/test/e2e`.
- `public`: static assets copied to the final build.
- `scripts`: repository maintenance scripts, including compromised-package checks.

## Tooling

- React
- Vite
- TypeScript
- Biome
- Vitest
- Playwright
- TanStack Query
- GitHub Actions
- GitHub Pages

## Workflow Notes

Husky hooks and CI enforce the main quality gates. 

Before pushing, expect `pnpm build:ci`, `pnpm test:coverage`, linting, and compromised-package checks to pass.

Pull requests also run Playwright in GitHub Actions.

## Compromised packages protection
This repository treats compromised-package detection as a separate defense-in-depth control for npm supply-chain incidents. The goal is not only to catch known vulnerable libraries in general, but to explicitly block exact package versions that should never appear anywhere in this project's dependency graph.

The blocklist lives in `compromised.txt`. The normal format is one exact `package@version` per line. Comments and empty lines are ignored. The checker also understands package-only entries and would treat them as "block every version of this package", but the repository policy is to keep the file exact and project-scoped so the list stays actionable and does not over-block unrelated versions. The only tracked metadata in the file is `# manual-entry:`, which marks exact emergency blocks that should survive future refreshes until they are removed explicitly.

`pnpm compromised:check` runs `scripts/check-compromised.js` and scans the current project dependency state using `package.json` and `pnpm-lock.yaml`. If any resolved package matches an entry from `compromised.txt`, the script exits with a non-zero status and prints the matched package version and its source. That makes the check suitable for local hooks and CI gates.

`pnpm compromised:update` runs `scripts/update-compromised.js` and refreshes `compromised.txt`. The updater fetches npm vulnerability and malware advisories from the GitHub Security Advisories API, keeps only exact compromised versions, filters them to packages that are actually part of this repository's dependency graph, removes stale, non-exact, or out-of-scope advisory-derived entries, and writes back a sorted file when the semantic blocklist content changes. Exact manual additions are also supported when a package needs to be blocked immediately; those entries are annotated in the file and preserved across later refreshes until removed explicitly. If GitHub advisories are unavailable, the curated fallback list is empty, or a refresh would erase the list entirely, the update fails closed instead of silently reusing stale data or writing an empty blocklist.

This protection is enforced in several places:

- `preinstall` refreshes the compromised list for local installs only when the local `.codex/cache/compromised-refresh-state.json` sidecar is older than the TTL or the current `package.json` / `pnpm-lock.yaml` fingerprint changed, and always runs the check before installation continues.
- `pre-commit` runs `pnpm compromised:check` so known bad versions are blocked before code is committed.
- `.github/workflows/nodejs.yml` skips the live refresh in pull request CI so build and e2e jobs stay fast.
- `.github/workflows/compromised-packages.yml` runs the live refresh and check after merges to `develop`, and fails if `compromised.txt` would need to change.
- `pnpm compromised:update` is a manual maintenance command when the blocklist needs to be refreshed outside the normal local install flow.
- CodeQL and Dependabot complement this setup, but they are separate controls; the compromised-package scripts provide an explicit hard block for versions already known to be unsafe for this project.
