# CLAUDE.md

## Build & Development
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Project Architecture & Standards
- **Tech Stack**: React + Vite + TailwindCSS.
- **Styling**: Use Vanilla CSS or TailwindCSS. Focus on premium, dynamic designs.
- **I18n**: Multi-language support is handled in `src/i18n/`. Always use i18n keys instead of hardcoded text.
- **API**: Backend functions are in `api/` (Firebase/Vercel compatible).

## Workflow (OpenSpec)
This project uses **OpenSpec** for change management.
- **Workflows**: Located in `.agent/workflows/`.
- **Specs**: Located in `openspec/`.
- When starting a task, refer to the relevant spec in `openspec/` and follow the workflows in `.agent/`.

## Coding Style
- **CASUAL but EXPERT**: Write clean, modern React code.
- **Components**: Functional components with hooks.
- **Naming**: CamelCase for variables/functions, PascalCase for components.
