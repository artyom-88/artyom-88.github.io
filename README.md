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
- `pnpm analyze`: build with the bundle visualizer.

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
