# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

No linter or test runner is configured.

## Architecture

This is a static **Astro 5** site with **React 19** islands, **Tailwind CSS 4**, and **Radix UI** primitives. No backend, no database.

### Rendering model
All pages are statically generated. React components only run client-side and must use an Astro client directive (`client:load`, `client:idle`) to hydrate. `.astro` files are server-rendered at build time and cannot read browser APIs (localStorage, etc).

### Auth
Client-side only. `localStorage.getItem('astroflow_auth') === 'true'` is the auth check. Protected pages use `<script is:inline>` at the top of the template (not frontmatter) to redirect before hydration — standard `<script>` tags in Astro are bundled and deferred, which would cause a flash.

### Path aliases (tsconfig.json)
| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@config/*` | `src/config/*` |
| `@utils/*` | `src/utils/*` |
| `@assets/*` | `src/assets/*` |

### Key files
- `src/config/site.ts` — `SITE`, `NAVIGATION`, `SOCIAL_LINKS` constants. **Edit here to change nav items.**
- `src/utils/trackingData.ts` — Hardcoded package records (CARGO-001 to CARGO-004) and tracking stage types.
- `src/utils/constants.ts` — `INDUSTRIES` and `CAPABILITIES` arrays used by tabs/accordions.
- `src/layouts/BaseLayout.astro` — Wraps every standard page with Header, Footer, and global CSS. Passes `currentPathname` to Header for active link highlighting.
- `src/styles/global.css` — Tailwind import, `.gradient-text` (navy→orange), `.nav-active` dot indicator, and `fadeInUp`/`fadeIn` keyframes.

### Component split
- `src/components/home/` — Astro components, one per homepage section.
- `src/components/react/` — React TSX components used for interactivity (forms, tabs, accordion, tracker, auth controls).
- `src/components/ui/` — Generic Astro UI primitives (Button, Card, Section, TestimonialCard).

### Pages
| Route | File | Notes |
|---|---|---|
| `/` | `index.astro` | 9 section homepage |
| `/login` | `login.astro` | Standalone (no BaseLayout), redirects to `/tracking` if already authed |
| `/tracking` | `tracking.astro` | Protected — redirects to `/login` if not authed |
| `/capabilities` | `capabilities.astro` | |
| `/use-cases` | `use-cases.astro` | |
| `/facilities` | `facilities.astro` | |
| `/rfq` | `rfq.astro` | |
| `/documentation` | `documentation.astro` | |

### Color palette
Navy `#1a2744` and orange `#f97316` are the two brand colors. All blue→teal gradients from the original template have been replaced. The `.gradient-text` CSS class uses this palette.

### React component notes
- `MobileMenu.tsx` imports `NAVIGATION` via relative path (`../../config/site`) not the `@config` alias — keep consistent if editing.
- `PackageTracker.tsx` and `LoginForm.tsx` also use relative imports to `../../utils/trackingData`.
- All interactive React components that need localStorage must initialize state as `false`/`undefined` and correct via `useEffect` to avoid SSR hydration mismatch.
