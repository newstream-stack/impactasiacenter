# AGENT.md

## Project Purpose
- This repository powers the Impact Asia Alliance Summit 2026 website.
- It is a bilingual, single-page event site built around section-based storytelling, speaker/theme content, venue information, and a chatbot endpoint.

## Quick Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Current Stack
- Frontend: React 18 + Vite 5
- Styling: CSS Modules for component styles, plus shared globals in `src/index.css`
- Localization: custom i18n layer in `src/i18n/`
- Markdown rendering: `react-markdown`
- AI endpoint: `api/chat.js` using `@google/generative-ai`

## Important Reality Check
- The current app does not use Tailwind in the shipped frontend.
- Prefer following the existing React + CSS Modules structure unless there is a deliberate refactor.
- Keep the visual language premium, cinematic, and event-oriented. Avoid generic dashboard-like UI patterns.

## Project Map
- `src/main.jsx`: React entry, mounts `App` and wraps it with `I18nProvider`
- `src/App.jsx`: top-level page composition order
- `src/components/*`: section components and their matching `*.module.css` files
- `src/i18n/I18nContext.jsx`: language selection and `t()` helper
- `src/i18n/translations/zh/` and `src/i18n/translations/en/`: translation sources
- `public/`: static images and event assets
- `api/chat.js`: serverless/edge chatbot handler
- `openspec/` and `.agent/`: OpenSpec config, skills, and workflows

## Frontend Conventions
- Each major section usually lives in its own folder under `src/components/`.
- Keep components functional and hook-based.
- Match the existing naming pattern:
  - Components: PascalCase
  - Variables/functions: camelCase
  - Styles: `ComponentName.module.css`
- Reuse the existing section composition in `App.jsx` unless the page flow is intentionally changing.

## I18n Rules
- Do not hardcode user-facing copy in components when the text belongs to site content.
- Add or update content in both:
  - `src/i18n/translations/zh/`
  - `src/i18n/translations/en/`
- Keep translation key shapes aligned across languages.
- The `t()` helper supports dot notation, for example `t('about.summary')`.
- Some components expect specific content formatting:
  - `AboutIntro` splits `about.summary` on blank lines using `\n\n`

## Styling Rules
- Prefer editing the component's CSS module instead of adding global overrides.
- Shared colors and theme tokens live in `src/index.css`.
- Preserve the current dark, high-contrast visual identity unless a redesign is requested.
- Favor intentional motion and spacing over adding more decorative elements.

## Chatbot Notes
- `api/chat.js` exposes a POST handler intended for edge/runtime deployment.
- It depends on `GEMINI_API_KEY`.
- The chatbot is constrained by local context objects defined inside `api/chat.js`.
- If chatbot content changes, update both the visible site copy and the chatbot context where relevant.

## OpenSpec Workflow
- This repo includes OpenSpec tooling under `.agent/` and `openspec/`.
- If a task is spec-driven, check:
  - `.agent/workflows/`
  - `.agent/skills/`
  - `openspec/config.yaml`
- If a task is a straightforward copy/style/code fix, normal implementation may be enough without expanding the spec system.

## Safe Change Guidelines
- Check existing component structure before introducing new patterns.
- Avoid large-scale refactors unless they are requested.
- Do not remove bilingual support.
- Do not revert unrelated user changes.
- Before changing copy, search for the same message in both UI translations and chatbot context.

## Good First Places To Look
- Hero or opening section issues: `src/components/Hero/`
- Mid-page intro copy: `src/components/AboutIntro/` and `src/i18n/translations/*/about.json`
- Theme detail interactions: `src/components/Themes/`, `src/components/DetailView/`, and related translation files
- Phoenix / venue content: `src/components/PhoenixIntro/`, `src/components/Venue/`
- Chatbot behavior: `src/components/ChatBot/` and `api/chat.js`

## Handoff Notes
- The current worktree was clean when this file was added.
- If future contributors update architecture or deployment flow, update this file first so the next agent inherits the real state of the project.
