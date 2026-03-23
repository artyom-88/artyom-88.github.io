# Repo Codex Notes

- This is a frontend-only Vite/React app deployed to GitHub Pages from `master`.
- Default verification for most code changes is `pnpm build:ci` plus `pnpm test:coverage`.
- Add `pnpm test:e2e` for routing, layout, or API-facing changes.
- Local development runs over HTTPS via `pnpm start`; defaults come from `.env.example`.
