# Pequeños Exploradores - Agent Instructions

## Commands
- **Dev Server:** `npm run dev` (starts Convex backend dev server and Vite frontend via `predev`)
- **Build:** `npm run build` (`tsc -b && vite build`)
- **Lint & Typecheck:** `npm run lint` (`tsc && eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`)

## Architecture & Stack
- **Frontend (`src/`):** React 19, Vite, TypeScript, Tailwind CSS v4, React Router, Lucide React.
- **Backend (`convex/`):** Convex real-time database, server functions, triggers, and `@convex-dev/auth`.
- **Validation & Types:** Zod v4 with `convex-helpers` (`zid` table ID references, `zodOutputToConvex`).

## OpenCode Subagents & Routing Rules
- **Convex / Backend Tasks:** Whenever user requests involve Convex backend, database schema, queries, mutations, validators, triggers, or sharded counters, proactively dispatch or utilize the `convex-domain` and `convex-db-assistant` subagents.
- **Frontend Tasks:** Whenever user requests involve React components, pages, modals, forms, Tailwind CSS styling, or UI development, proactively dispatch or utilize the `frontend-creator` subagent.

- **Agents (`.opencode/agents/` / `opencode.json`):**
  - `convex-architect`: Universal Convex architect agent for modular backend domains, Zod v4 validation, custom wrappers, and relational triggers.
  - `frontend-creator`: Scaffolds self-contained React 19 feature pages, modals, and forms.
  - `convex-domain`: Scaffolds Convex backend domains (schema, validators, queries, mutations, triggers).
  - `convex-db-assistant`: Manages database schema design, relational indexes, triggers, and sharded counters.
- **Skills (`.opencode/skills/`):**
  - `zod-convex-validation`: Zod v4 and convex-helpers validation patterns.
  - `convex-triggers`: Reactive database triggers and relational integrity checks.
  - `tailwind-react-components`: Tailwind CSS v4 styling and self-contained Convex hook patterns.

## Workflow & Gotchas
- No automated testing suite is configured (verify changes using `npm run lint` and `npm run build`).
- Convex backend requires initial project setup (`convex dev` / `convex init`).
- Always run `npm run lint` after code changes to ensure strict TypeScript and ESLint compliance (`--max-warnings 0`).
