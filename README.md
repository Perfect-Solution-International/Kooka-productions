<h1 align="center">Kooka Productions</h1>

Marketing website and lightweight admin CMS for **Kooka Productions**, a Melbourne-based event production and AV hire company. Built with Next.js 16 (App Router), React Three Fiber for the animated hero scene, and Tailwind CSS v4.

> Live domain (configured, not verified reachable from this environment): `https://www.kookaproductions.com.au`

## Overview

The site presents Kooka Productions' services (event production, AV hire, LED walls, projection mapping, live streaming), showcases past work ("Kooka Footprint" / project showreel), and introduces the team and partners. It also ships a minimal password-protected admin panel for managing the portfolio ("Footprint") entries — add, edit, delete projects and upload their images — without needing a database.

- **What it does:** Public marketing site (home, dna, solutions, showreel, footprint) + an internal `/admin` CRUD tool for portfolio items.
- **Who it's for:** Kooka Productions' marketing team/site owner (admin panel) and prospective clients browsing the public site.
- **Main objectives:** Fast, visually striking (WebGL hero, glassmorphism UI, motion) marketing presence with zero external backend dependency — content lives in versioned TypeScript/JSON files, not a database.

## Features

### Public Site
- Animated Three.js/WebGL hero scene with device-tier-aware quality scaling
- Responsive marketing pages: Home, DNA, Solutions, Showreel, Footprint
- Reveal/scroll animations via Framer Motion
- Reduced-motion support (`prefers-reduced-motion` aware hooks)
- Custom Unsplash-backed image loader (bypasses `/_next/image` for external photography)
- SEO metadata (Open Graph, Twitter cards, canonical URLs, structured titles) per page
- Partner/client logo marquee and trusted-partners grid
- Contact strip with `mailto:`/`tel:` deep links (no form backend)

### Admin Panel (`/admin`)
- Single shared-password authentication (HMAC-signed, timing-safe, cookie-based session)
- Session cookie valid 12 hours, `httpOnly` + `secure` (in production) + `SameSite=Lax`
- CRUD for "Footprint" (portfolio) items — title, type, location, year, blurb, image, optional link
- Image upload (JPEG/PNG/WebP/GIF/SVG, 5MB max) saved to `public/Project/`
- Auto-generated, collision-safe slugs used as record IDs
- Auto-redirect: `/admin` → `/admin/projects` (if authenticated) or `/admin/login`

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| 3D / WebGL | Three.js, @react-three/fiber |
| Styling | Tailwind CSS v4 (`@theme` design tokens, config-free) |
| Animation | Framer Motion |
| Backend | Next.js Route Handlers (API routes) |
| Data Storage | Flat file (`data/content/footprint.json`) via Node `fs` — no database |
| Authentication | Custom HMAC session cookie (no external auth provider) |
| Icons | lucide-react |
| Build Tools | Next.js CLI, PostCSS (`@tailwindcss/postcss`) |
| Linting | ESLint 9 (`eslint-config-next`, flat config) |
| Testing | Not implemented |
| Deployment | Not configured (no Dockerfile, no CI/CD workflows present) |

## Architecture

Next.js **App Router** project, effectively a **layered/feature-folder** structure rather than classic MVC:

- **`app/`** — routes, layouts, and API route handlers (the "controller" layer)
- **`components/`** — presentational and interactive UI, grouped by concern (`3d/`, `layout/`, `sections/`, `ui/`, `admin/`)
- **`data/`** — static content and typed fixtures acting as the "model" layer for the public site (services, projects, team, nav, etc.)
- **`lib/`** — framework-agnostic utilities, auth logic, and the file-backed data store for the admin CMS

**Data flow (public pages):** page (`app/**/page.tsx`) imports typed content from `data/*.ts` → passes it to presentational components in `components/sections/**` → rendered server-side by default (Server Components), with `"use client"` opted in only where interactivity/animation/hooks are needed.

**Data flow (admin CMS):** `app/admin/**/page.tsx` (Server Component) checks the session cookie via `lib/adminAuth.ts` → reads `data/content/footprint.json` through `lib/footprintStore.ts` → hydrates the `ProjectsManager` client component → mutations go through `app/api/admin/**` Route Handlers, which re-validate the session, then read/write the JSON file (and write uploaded images straight to `public/Project/`).

## Folder Structure

```
kooka/
├── app/                        # Next.js App Router: pages, layouts, API routes
│   ├── dna/                    # /dna
│   ├── solutions/               # /solutions (Kooka Solutions)
│   ├── showreel/                # /showreel (portfolio/showreel page)
│   ├── footprint/                # /footprint (Kooka Footprint)
│   ├── admin/                   # /admin, /admin/login, /admin/projects (CMS)
│   ├── api/admin/                # Route handlers: login, logout, projects CRUD, upload
│   ├── fonts/                    # Self-hosted variable fonts (Inter, Outfit)
│   ├── layout.tsx                # Root layout (fonts, metadata, SceneCanvas, header/footer)
│   ├── loading.tsx               # Global loading screen
│   ├── globals.css               # Tailwind v4 theme tokens + global styles
│   └── page.tsx                  # Home page
├── components/
│   ├── 3d/                       # React Three Fiber scene: camera, lighting, particles, panels
│   ├── admin/                    # ProjectsManager (admin CRUD UI)
│   ├── effects/                  # Cursor parallax and similar interaction effects
│   ├── layout/                   # Header, SiteHeader, Footer
│   ├── projects/                 # Project detail/showcase components
│   ├── providers/                # MotionProvider (Framer Motion context)
│   ├── sections/                 # Page sections grouped by page (home/, services/, showreel/, shared/, footprint/)
│   └── ui/                       # Reusable primitives (Button, GlassCard, Icon, Reveal, Section, ...)
├── data/                         # Static/typed content (services, projects, team, nav, site info, media map)
│   └── content/footprint.json    # Mutable data file backing the admin CMS
├── lib/                          # adminAuth, footprintStore, imageLoader, motion helpers, hooks
├── public/                       # Static assets: images, logo, fonts source media
│   ├── Project/                  # Destination for admin-uploaded images
│   └── media/                    # Showreel video slot (see public/media/README.md)
├── next.config.ts                # Custom image loader config
├── eslint.config.mjs             # Flat ESLint config (Next core-web-vitals + TypeScript)
├── tsconfig.json                 # Strict TypeScript, `@/*` path alias
└── package.json
```

## Database

**Not implemented.** There is no relational/NoSQL database. The only persisted, mutable content is a single JSON file:

- **`data/content/footprint.json`** — array of portfolio ("Footprint") records, each shaped as:

| Field | Type | Notes |
|-------|------|-------|
| `slug` | `string` | Unique ID, auto-generated from `title` |
| `title` | `string` | Required |
| `type` | `string` | Required |
| `location` | `string` | Required |
| `year` | `string` | Required |
| `blurb` | `string` | Required |
| `image` | `string` | Required — path to an uploaded or static image |
| `href` | `string` | Optional external/detail link |

Reads/writes go through `lib/footprintStore.ts` using Node's `fs` module directly — no ORM, no migrations. All other site content (services, team, partners, projects, values, navigation) is hardcoded as typed TypeScript modules in `data/`.

## API Documentation

All endpoints below live under `app/api/admin/`. Every endpoint except login requires a valid `kooka_admin_session` cookie.

| Method | Endpoint | Description | Authentication |
|--------|----------|--------------|-----------------|
| POST | `/api/admin/login` | Verify admin password, issue signed session cookie | None (public) |
| POST | `/api/admin/logout` | Clear the session cookie | Session cookie |
| GET | `/api/admin/projects` | List all footprint/portfolio items | Session cookie |
| POST | `/api/admin/projects` | Create a footprint item | Session cookie |
| PUT | `/api/admin/projects/[id]` | Update a footprint item by slug | Session cookie |
| DELETE | `/api/admin/projects/[id]` | Delete a footprint item by slug | Session cookie |
| POST | `/api/admin/upload` | Upload an image (≤5MB, jpg/png/webp/gif/svg) to `public/Project/` | Session cookie |

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd kooka
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables — create a `.env` file in the project root:
   ```bash
   ADMIN_PASSWORD=your-admin-password
   ```
4. Database migrations — **not applicable** (no database)
5. Seed database — **not applicable**; portfolio content lives in `data/content/footprint.json` and can be edited directly or via `/admin` after step 6
6. Start the app
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|--------------|----------|
| `ADMIN_PASSWORD` | Shared password for `/admin` login; also used as the HMAC secret for signing session cookies | Yes |

No `.env.example` file exists in the repository — create `.env` manually as shown above.

## Running the Project

| Purpose | Command |
|---------|---------|
| Development server | `npm run dev` |
| Production build | `npm run build` |
| Start production server (after build) | `npm run start` |
| Lint | `npm run lint` |
| Test | Not implemented |
| Format | Not implemented (no Prettier config present) |

## Screenshots

_Not included in the repository. Add screenshots here, e.g.:_

```markdown
![Home page](docs/screenshots/home.png)
![Admin panel](docs/screenshots/admin.png)
```

## Authentication Flow

There is a single, shared admin credential — no user accounts, roles, or registration.

- **Login:** `POST /api/admin/login` with `{ "password": string }`. The password is compared to `process.env.ADMIN_PASSWORD` using `crypto.timingSafeEqual` (constant-time, avoids timing side-channels).
- **Session issuance:** On success, a session token of the form `expires.signature` is generated (`lib/adminAuth.ts`), where `signature = HMAC-SHA256(expires, ADMIN_PASSWORD)`. It's set as an `httpOnly`, `SameSite=Lax` cookie (`kooka_admin_session`), `secure` in production, valid for 12 hours.
- **Session verification:** Each protected route/page calls `isAdminAuthenticated()`, which re-derives the HMAC from the cookie's `expires` value and compares it (constant-time) against the stored signature, then checks the expiry timestamp.
- **Refresh token:** Not implemented — sessions simply expire after 12 hours and require re-login.
- **Logout:** `POST /api/admin/logout` deletes the cookie.
- **Roles/permissions:** None — a valid session grants full CMS access; there is no role hierarchy.

## Error Handling

- **Validation:** API route handlers manually validate request bodies (e.g. `parseFootprintInput` in `lib/footprintStore.ts` checks required string fields and trims input) before touching the data store.
- **Exception handling:** JSON body parsing is wrapped in `.catch(() => null)` to avoid throwing on malformed payloads; handlers then return a structured `400`/`401` JSON error instead of crashing.
- **HTTP status codes used:**
  - `200` — successful GET/logout
  - `201` — successful create/upload
  - `400` — invalid/missing input, unsupported file type, oversized file
  - `401` — missing/invalid session or wrong password
  - `404` — footprint item not found (update/delete)

## Performance Optimizations

- Custom image loader (`lib/imageLoader.ts`) delegates resizing/format negotiation to the image CDN (Unsplash) instead of routing through `/_next/image`, avoiding timeouts on image-heavy pages
- Explicit `qualities: [75, 82, 90]` tuning in `next.config.ts` for hero/backdrop art
- Device-tier-aware WebGL quality scaling (`components/3d/useQualityTier.ts`) — reduces particle/lighting complexity on lower-powered devices
- Self-hosted variable fonts (`next/font/local`) with `display: swap` to avoid render-blocking font loads
- `prefers-reduced-motion`–aware hooks (`lib/useReducedMotion.ts`) to skip animation work when requested
- Server Components by default; `"use client"` scoped only to interactive/animated leaves

## Security

- **Authentication:** Single shared password, HMAC-SHA256–signed session tokens (see [Authentication Flow](#authentication-flow))
- **Authorization:** Binary — authenticated or not; every admin API route re-checks the session server-side (not just the UI)
- **Password hashing:** The admin password itself is not hashed at rest (compared directly via constant-time comparison); it is only ever exposed via the `ADMIN_PASSWORD` environment variable, never logged or returned
- **Input validation:** Manual runtime validation of all admin API payloads; file uploads restricted to a fixed MIME-type allowlist and 5MB size cap
- **CSRF:** Mitigated by `SameSite=Lax` cookies; no explicit CSRF token mechanism
- **CORS:** Not configured (same-origin app; no cross-origin API consumers)
- **Rate limiting:** Not implemented — no protection against brute-forcing `/api/admin/login`
- **SQL injection:** Not applicable — no SQL database
- **XSS protection:** React's default JSX escaping; no use of `dangerouslySetInnerHTML` observed in reviewed code

## Deployment

**Not configured.** No `Dockerfile`, `docker-compose.yml`, Nginx config, GitHub Actions workflow, or platform-specific config (`vercel.json`, `netlify.toml`, etc.) exists in the repository.

Since this is a standard Next.js app, it is compatible out of the box with platforms that support Next.js (e.g. Vercel), or a Node.js server running `npm run build && npm run start`. `ADMIN_PASSWORD` must be set in the target environment either way.

## Future Improvements

- Add automated tests (unit/integration/E2E) — none currently exist
- Add rate limiting / brute-force protection to `/api/admin/login`
- Move portfolio storage from a flat JSON file to a proper database for concurrent-write safety
- Wire up the "Get a Quote" contact flow to a real form backend instead of a `mailto:` link
- Add CI (lint/build/typecheck) via GitHub Actions
- Provide a `.env.example` file
- Re-enable or remove the currently commented-out Admin Panel footer link (`data/navigation.ts`)

## Contributing

No `CONTRIBUTING.md` is present. General guidance based on existing tooling:

1. Fork/branch from `main`
2. Follow the project's code-quality rules (see `CLAUDE.md`): no `any` (use `unknown` + narrowing), no default exports, comments only where non-obvious, multiline comment blocks only
3. Run `npm run lint` before opening a PR
4. Open a pull request describing the change

## License

**Not specified.** No `LICENSE` file is present in the repository. All rights reserved by default unless the repository owner adds an explicit license.

## Author

- **Name:** _Add name_
- **GitHub:** _Add GitHub profile_
- **LinkedIn:** _Add LinkedIn profile_
- **Email:** info@kookaproductions.com.au *(business contact, per `data/site.ts`)*
