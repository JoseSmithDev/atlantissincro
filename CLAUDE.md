# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Atlantis Sincro** — A state-of-the-art web platform for an Artistic Swimming club in Valencia, Spain.

- **Goal:** Replace a legacy WordPress site with a high-performance, $0-egress cost architecture.
- **User Personas:** Parents (photo access) and Non-technical Admin (content management).
- **Base:** Polideportivo de Nazaret (Valencia)
- **Philosophy:** "Familia Atlantis" — competitive excellence with social values and discipline.
- **Programs:** Initiation (6–11 years), Performance, and Competition levels.

## Tech Stack

- **Framework:** Next.js 16 (App Router, PPR, Server Actions)
- **Styling:** Tailwind CSS v4 (configured via `@theme` variables in `globals.css`)
- **Animations:** Framer Motion (Fluid/Liquid UI transitions)
- **Auth/Database:** Supabase (`@supabase/ssr`)
- **Media Storage:** Cloudflare R2 (S3-compatible, $0 egress fees)
- **Deployment:** Vercel (Hobby Tier)

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Design System (Hierarchy: Red > White > Blue)

| Role     | Color     | Hex       | Usage                                          |
|----------|-----------|-----------|-------------------------------------------------|
| Primary  | Red       | `#D32F2F` | Branding, CTAs, competitive energy              |
| Surface  | White     | `#FFFFFF` | Main backgrounds, clean elegant look            |
| Accent   | Blue      | `#003366` | Headers, footers, depth/water theme             |

**Vibe:** "Liquid Motion" — smooth transitions and `rounded-3xl` corners to mimic water flow. Use `AnimatePresence` for route changes and `layoutId` for gallery transitions.

## Database Schema (Supabase)

| Table          | Fields                                      | RLS Policy              |
|----------------|---------------------------------------------|--------------------------|
| `profiles`     | id, email, role (admin/parent), location    | Authenticated only       |
| `competitions` | id, name, date, slug, cover_url             | Public read              |
| `photos`       | id, comp_id, r2_key, width, height          | Role: 'parent' or 'admin'|
| `site_content` | key, value_es, type (text/image)            | Public read / Admin write|

## Route Structure

- `/` — High-impact landing page (Hero, News, Values)
- `/club` — Club history, locations (Nazaret, Burjassot, Benimamet), coaching staff
- `/area-padres` — **Protected.** Private gallery with "Download All" and optimized lightbox
- `/admin` — **Protected (Admin Only).** Minimalist CMS:
  - Uploader: Client-side WebP compression + Direct-to-R2 upload
  - Content: Simple forms to edit homepage text/news

## Architecture

### Supabase Integration
- **Browser client:** `src/lib/supabase/client.ts` — used in `'use client'` components
- **Server client:** `src/lib/supabase/server.ts` — used in Server Components and Route Handlers
- **Middleware:** `src/lib/supabase/middleware.ts` + `src/middleware.ts` — refreshes auth session
- **Schema:** `supabase-schema.sql` — tables, RLS policies, triggers, seed data
- **Types:** `src/lib/types.ts` — TypeScript types mirroring DB tables

### Cloudflare R2 (Media Storage)
- Photos are stored in R2, not Supabase Storage, to avoid egress costs
- Admin uploads go through client-side WebP compression before upload
- API route provides presigned upload URLs for direct browser-to-R2 uploads

## Implementation Guidelines

- **Cost Efficiency:** Use Cloudflare R2 for all gallery images to avoid Supabase storage egress limits
- **SEO:** Implement JSON-LD for `SportsOrganization`. Ensure Spanish (ES) meta tags
- **UX for Admin:** Large icons (Lucide) and simple "Save" buttons. No complex menus
- **Performance:** Target 100/100 Lighthouse. Use `next/image` for all assets
- **Fluidity:** Use `AnimatePresence` for route changes and `layoutId` for gallery transitions
- **All UI text in Spanish (Castellano)**
- Server Components for data fetching; Client Components only when interactivity is needed

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=atlantis-photos
R2_PUBLIC_URL=https://your-r2-public-domain.com
```
