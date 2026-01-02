# AI Coding Agent Instructions for waste-watch

## Project Overview
**WasteWatch** is a mobile-first PWA for community waste management that enables residents to report, track, and monitor waste issues in real-time. Built for the Alameda Hacks hackathon (10-day MVP targeting "Best Real-World Impact" award).

**Tech Stack:**
- **Frontend:** Next.js 16.1.1 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4
- **Backend/BaaS:** Supabase (PostgreSQL, Auth, Storage, Row Level Security)
- **Maps:** Leaflet.js + OpenStreetMap
- **Package Manager:** pnpm (see [pnpm-workspace.yaml](../pnpm-workspace.yaml))
- **Hosting:** Vercel

**Core User Flows:**
1. Resident reports waste issue (type, location, photo)
2. Issue stored in Supabase, appears on public map
3. Volunteers/admins mark as acknowledged → cleaned
4. Status updates propagate in real-time

## Development Workflow

### Running the Project
- **Dev server**: `pnpm dev` (opens on http://localhost:3000)
- **Build**: `pnpm build` 
- **Production**: `pnpm start`
- **Linting**: `pnpm lint`

### Package Management
Always use `pnpm` commands (not npm/yarn):
```bash
pnpm add <package>        # Add dependency
pnpm add -D <package>     # Add dev dependency
pnpm install              # Install dependencies
```

## Core Features & Data Model

### MVP Features (Must-Have)
- **User authentication:** Email/password or social login via Supabase Auth
- **Report submission:** Issue type, location (map pin/auto-detect), photo upload to Supabase Storage
- **Public map:** Display all reported issues using Leaflet.js
- **Status tracking:** Reported → Acknowledged → Cleaned (update workflow)
- **List view:** Filter by status, type, proximity

### Optional Features
- Upvote/duplicate detection, leaderboard, heatmap, notifications, weekly community score

### Database Schema (Supabase)
Key tables to implement:
- `waste_reports`: id, user_id, issue_type, location (PostGIS point), photo_url, status, created_at, updated_at
- `users`: id (Supabase Auth), display_name, role (resident/volunteer/admin)
- `report_votes`: user_id, report_id (for upvoting duplicates)

## Architecture & File Structure

### App Router Structure
- All routes live in [app/](../app/) directory using Next.js App Router conventions
- [app/layout.tsx](../app/layout.tsx) defines the root layout with Geist font configuration
- [app/page.tsx](../app/page.tsx) is the home page (route: `/`)
- Planned routes: `/report` (submit form), `/map` (public map), `/dashboard` (admin/volunteer)

### Styling Approach
- **Tailwind CSS v4** with PostCSS plugin (see [postcss.config.mjs](../postcss.config.mjs))
- Global styles in [app/globals.css](../app/globals.css) using `@import "tailwindcss"` and `@theme inline` syntax
- CSS custom properties for theming: `--background`, `--foreground`, with dark mode via `prefers-color-scheme`
- Geist Sans and Geist Mono fonts are configured as CSS variables: `--font-geist-sans`, `--font-geist-mono`
- **Mobile-first design:** App must be responsive for primary mobile use case

### Supabase Integration
- Initialize Supabase client in `@/lib/supabase.ts` (server) and `@/lib/supabase-browser.ts` (client)
- Use Row Level Security (RLS) for data access control
- Storage buckets for photo uploads: `waste-photos` bucket with public read access
- Real-time subscriptions for live status updates on map/dashboard
- Auth patterns: Use Supabase Auth with Server Components where possible

### Map Integration (Leaflet.js)
- Leaflet requires client-side rendering: wrap in `"use client"` component
- Display markers for each waste report with color-coded status (red=reported, yellow=acknowledged, green=cleaned)
- Add map pin selection for location input in report form
- Optional: Heatmap layer for hotspot visualization

### TypeScript Configuration
- Path alias: `@/*` maps to project root (e.g., `import { foo } from "@/app/utils"`)
- Strict mode enabled
- Target: ES2017
- JSX transformed to `react-jsx` (no need to import React in components)

### ESLint Configuration
- Modern flat config format ([eslint.config.mjs](../eslint.config.mjs))
- Uses Next.js ESLint presets: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Code Conventions

### Component Patterns
- Default exports for page components (required by Next.js App Router)
- TypeScript for all `.tsx` files
- Use Next.js `Image` component from `next/image` for images (see [app/page.tsx](../app/page.tsx#L1))
- Server Components by default (add `"use client"` directive only when needed)

### Metadata
- Export `metadata` object from page/layout files for SEO (see [app/layout.tsx](../app/layout.tsx#L16-L19))

### Styling
- Use Tailwind utility classes inline with `className` prop
- Dark mode classes using `dark:` prefix (e.g., `dark:bg-black`, `dark:text-zinc-50`)
- Responsive classes with breakpoint prefixes (e.g., `sm:`, `md:`)

## Common Tasks

### Adding a New Page
1. Create directory in `app/` (e.g., `app/about/`)
2. Add `page.tsx` with default export function
3. Optionally add `layout.tsx` for route-specific layout

### Adding Client Interactivity
Add `"use client"` directive at the top of the file when using hooks, event handlers, or browser APIs.

### Environment Variables
Create `.env.local` for local environment variables (not committed to git). Access with `process.env.VARIABLE_NAME`.

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
