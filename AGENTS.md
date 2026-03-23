# Repo Codex Notes

- This is a frontend-only Vite/React app deployed to GitHub Pages from `master`.
- Default verification for most code changes is `pnpm build:ci` plus `pnpm test:coverage`.
- Add `pnpm test:e2e` for routing, layout, API-facing, or tooling/runtime changes that can affect browser behavior, including Vite, TypeScript, Playwright, and env-loading changes.
- When updating `@types/node`, stay on the same major.minor line as `.nvmrc` and only take patch releases within that line.
- Local development runs over HTTPS via `pnpm start`; defaults come from `.env.example`.
