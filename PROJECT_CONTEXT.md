# PROJECT_CONTEXT.md — walidkhalladi.com

## Overview

Personal portfolio / blog / landing page for Walid Khalladi — a senior software engineer based in Munich, Germany, specializing in mobile development (Android/iOS native, Kotlin Multiplatform) and AI/Computer Vision systems.

**Domain:** walidkhalladi.com
**Purpose:** Portfolio + blog + personal brand — serves recruiters, freelance clients, and the dev community simultaneously.
**Vibe:** Senior engineer. Precise. Minimal. Not flashy — controlled power.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 14+** (App Router) | SSR/SSG for blog SEO, React ecosystem, file-based routing for blog posts |
| Styling | **Tailwind CSS** | Fast, dark mode built-in, minimal aesthetic |
| Animations | **Framer Motion** | Scroll-triggered animations, page transitions, layout morphs — plays natively with React |
| Smooth Scroll | **Lenis** | Buttery smooth scroll feel within content areas |
| Blog Content | **MDX** | Markdown + React components for interactive code demos in posts |
| Deployment | **Vercel** | Free tier, connect domain, zero-config deploys |
| Language | **TypeScript** | Non-negotiable for a senior engineer's site |

### Libraries NOT to use
- **Three.js / WebGL** — Not needed. The design direction is subtle animations, not 3D. Can be added later to a single section if desired.
- **GSAP** — Framer Motion covers everything needed. Don't mix animation libraries.
- **jQuery** — Obviously not.

---

## Design Direction

### Theme
- **Dark mode only** — No light mode toggle. Commit to the aesthetic.
- **Background:** True black `#000000` or near-black `#0A0A0A`
- **Primary text:** Off-white `#E5E5E5` for body copy
- **Headings:** Pure white `#FFFFFF`
- **Accent color:** ONE single muted color used sparingly — for CTAs, hover states, active nav indicators, and highlights only. Suggested: subtle electric blue (`#60A5FA`) or warm amber (`#F59E0B`). NOT neon. NOT gradients. One color, used with restraint.
- **Borders/dividers:** Very subtle, e.g., `#1A1A1A` or `#222222`

### Typography
- **Font:** Clean sans-serif — Inter, Satoshi, or Space Grotesk
- **Headings:** Large, bold weight (700+)
- **Body:** Light weight (300-400), generous line height
- **Monospace (for code):** JetBrains Mono or Fira Code
- The typography should do 80% of the "senior" work. Big confident headings, clean readable body.

### Layout — Single Viewport, No Page Scroll

**CRITICAL DESIGN DECISION: This is NOT a scrollable website.**

The site uses a **fixed viewport layout** — the browser window is the canvas, nothing scrolls at the page level. Content changes are handled via **animated transitions** within the content area.

```
┌──────────┬────────────────────────────────────┐
│          │                                    │
│   NAV    │         CONTENT AREA               │
│  SIDEBAR │                                    │
│          │    (content morphs/transitions      │
│  ┌────┐  │     between sections — no scroll)   │
│  │ WK │  │                                    │
│  └────┘  │    Internal scroll allowed for      │
│          │    long content like blog posts      │
│  Home    │                                    │
│  About   │                                    │
│  Work    │                                    │
│  Blog    │                                    │
│  Contact │                                    │
│          │                                    │
└──────────┴────────────────────────────────────┘
```

#### Sidebar Navigation
- **Narrow** — ~80px collapsed, ~200px if expanded
- **Always visible** on desktop
- Walid's monogram or logo at the top ("WK" or stylized name)
- Nav items listed vertically below
- Active section indicator (accent color dot or bar)
- Subtle thin border or gradient separating sidebar from content
- **Mobile:** Collapses to bottom tab bar or hamburger menu

#### Content Transitions (Morph Style)
- When navigating between sections, content doesn't just fade — **elements morph between states**
- Shared elements animate between positions (e.g., a heading in one section slides to become a subheading in another)
- New elements enter staggered (heading → body → visuals, with slight delays)
- Exit animations: current content fades/scales down before new content enters
- Use Framer Motion's `AnimatePresence` + `layoutId` for shared element transitions
- Transitions should feel smooth and intentional, ~400-600ms duration, ease-out curves

#### Animation Details
- **Section enters:** Elements fade-up + slight scale (0.95 → 1.0), staggered 50-100ms per element
- **Section exits:** Fade-out + slight scale down, faster than enter (~200ms)
- **Hover states:** Project cards get soft glow or subtle scale-up (1.02x). Cursor may have a custom dot follower.
- **Background:** Subtle noise/grain texture or slow-moving gradient — alive but not distracting
- **No parallax** — doesn't apply since there's no page scroll

---

## Content Structure

### 1. Hero (Home)
- Walid's full name, large and prominent
- Positioning one-liner: something like "I architect mobile systems and AI-powered solutions" — short, confident, senior energy
- One CTA button (e.g., "See my work" or "Get in touch")
- Subtle animated background element (particle field, noise grain, or slow geometric animation)

### 2. About
- **NOT a resume dump.** This is a personal story.
- Journey narrative: Tunisian roots, based in Munich, path from mobile dev to AI/CV systems
- Philosophy: "Learn as much as possible every day, build things that matter"
- Personal touches: books, fitness, curiosity
- Professional photo or stylized avatar
- Keep it human — recruiters want skills, clients and community want to know the person

### 3. Expertise (What I Do)
- **NOT a skills logo grid** (that's junior energy)
- 3 deep expertise pillars, each framed as "I've shipped real things in this space":

  **Pillar 1: Mobile Engineering**
  - Android/iOS native development
  - Kotlin Multiplatform (KMP) — libraries and apps
  - Production apps (Chantik)

  **Pillar 2: AI & Computer Vision**
  - On-device ML inference
  - Object detection (YOLO family), real-time processing
  - System architecture for CV pipelines

  **Pillar 3: System Architecture**
  - End-to-end system design (API → infra → client)
  - Backend services (FastAPI, Docker, PostgreSQL)
  - Cross-platform library design

### 4. Projects (Work)
- Case study format for each project
- Each project shows: Problem → Approach → Architectural Decisions → Tech Stack → Results/Status
- **NOT just screenshots** — explain the WHY behind decisions

  **Current projects to showcase:**
  - **Chantik** — Production Android app for construction site management (Khalladi Group). Full case study with architecture diagrams.
  - **KMP AI/ML Inference Library** (planned) — Open-source KMP abstraction over TFLite (Android) + CoreML (iOS). Unified API for on-device inference.
  - **walidkhalladi.com** — This website itself. Built with Next.js, Framer Motion, custom animations. Meta but effective.
  - **Future KMP utility libraries** — Slot in as they ship.

  **For AI/CV work done professionally:** Blog about the approach and architecture generically (no company IP). The knowledge is Walid's, the deployed product is not.

  **IMPORTANT: No EVO project content.** Enhanced EVO belongs to Walid's company, not his personal portfolio. Do not reference it anywhere on the site.

### 5. Blog
- Mix of two content tracks:
  - **Technical:** KMP deep-dives, AI/CV architecture breakdowns, "how I built X" series, library design patterns
  - **Personal growth:** Book reviews, engineering philosophy, lessons learned
- Show latest 3 posts as previews in the Blog section
- Individual posts live at `/blog/[slug]` routes (these CAN scroll internally within the content area)
- MDX-powered for embedding interactive components in posts

### 6. Contact (Say Hi)
- Simple and clean
- Email link or contact form
- GitHub and LinkedIn links
- If open to freelance: say it explicitly
- No fluff — just make it easy to reach out

---

## Project Structure (Suggested)

```
walidkhalladi.com/
├── app/
│   ├── layout.tsx              # Root layout with sidebar nav
│   ├── page.tsx                # Home/Hero section
│   └── blog/
│       └── [slug]/
│           └── page.tsx        # Individual blog post pages
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Fixed sidebar navigation
│   │   ├── ContentArea.tsx     # Animated content container
│   │   └── MobileNav.tsx       # Mobile bottom tab bar
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Expertise.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── AnimatedText.tsx
│   │   └── SectionTransition.tsx
│   └── animations/
│       ├── variants.ts         # Framer Motion animation variants
│       └── transitions.ts      # Transition configs
├── content/
│   └── blog/                   # MDX blog posts
│       └── *.mdx
├── lib/
│   ├── mdx.ts                  # MDX processing utilities
│   └── constants.ts            # Site metadata, nav items, etc.
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── globals.css             # Tailwind base + custom CSS variables
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Routing Strategy

Since this is a single-viewport app with section transitions (not traditional page navigation):

- **Main sections** (Hero, About, Expertise, Projects, Blog overview, Contact) are NOT separate routes. They are rendered within the same page and swapped via state + Framer Motion transitions.
- **Blog post pages** (`/blog/[slug]`) ARE separate routes — they need their own URLs for SEO and shareability. These pages still use the sidebar layout but the content area renders the full blog post (with internal scroll).
- Use `useState` or URL hash (`#about`, `#work`) to track active section on the main page. URL hash is preferred for shareability.
- The sidebar nav updates the active section and triggers the content transition.

---

## Mobile Responsive Strategy

- **Desktop (>1024px):** Full sidebar + content area layout as described
- **Tablet (768-1024px):** Sidebar collapses to icons only (~60px), content area fills remaining space
- **Mobile (<768px):** No sidebar. Bottom tab bar navigation (5 icons: Home, About, Work, Blog, Contact). Content area is fullscreen. Same morph transitions apply.

---

## Performance Requirements

- Lighthouse score target: 95+ across all categories
- First Contentful Paint < 1.5s
- No layout shift from animations (use `will-change` and `transform` only)
- Lazy load blog post content
- Optimize fonts: use `next/font` with subset loading
- Images: use `next/image` with WebP/AVIF formats

---

## SEO Strategy

- Meta tags and Open Graph for all pages
- Blog posts need proper `<title>`, `<meta description>`, and structured data
- Sitemap generation via `next-sitemap`
- RSS feed for blog (helps with dev community reach)

---

## Design References

These sites capture elements of the target aesthetic:
- **vanholtz.co** — Fixed nav, content transitions
- **niccolomiranda.com** — Dark, morph-style page transitions
- **dennissnellenberg.com** — Fixed layout, animated content swaps
- **brittanychiang.com** — Clean developer portfolio structure
- **leerob.io** — Minimal, blog-heavy senior engineer vibe

---

## Owner Context

- **Name:** Walid Khalladi
- **Location:** Munich, Germany (originally from Tunisia)
- **Role:** Senior Software Engineer — Mobile & AI/CV
- **Company:** Works at a company (Enhanced EVO project — DO NOT include on site)
- **Independent work:** Chantik app (Khalladi Group), open-source KMP libraries (planned)
- **Interests:** Programming, self-development books, fitness, real estate, investments
- **Communication style:** Casual, geeky, senior-engineer-level
- **Design preference:** Minimal black/white aesthetic

---

## What NOT to Include

- No EVO / Enhanced EVO references (company IP)
- No skills logo grids (junior energy)
- No "Hello, I'm a developer" generic hero text
- No light mode (commit to dark)
- No page-level scrolling (fixed viewport with content transitions)
- No Three.js/WebGL unless explicitly requested later
- No stock photos — use real project screenshots or stylized graphics
