# CLAUDE.md — Makassar Golden Hotel

## Project Overview
Luxury hotel landing page for **Makassar Golden Hotel** — an editorial, high-end single-page React site.

## Stack
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Framer Motion 12** — scroll reveals, card animations
- **GSAP 3** — timeline / sequenced animations
- **lucide-react** — iconography

## Dev Commands
```bash
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Design System

### Typography
| Role    | Font                          | Size  | Weight | Tracking      |
|---------|-------------------------------|-------|--------|---------------|
| Display | `"Instrument Serif", serif`   | —     | 200    | -0.025em      |
| Body    | `"Inter", sans-serif`         | 14px  | —      | —             |
| Label   | `"Inter", sans-serif`         | 12px  | —      | 1.2px, UPPER  |

### Color Tokens
| Token     | Value     |
|-----------|-----------|
| Primary   | `#F47C59` |
| Secondary | `#241208` |
| Neutral   | `#FCF9F6` |

### UI Rules
- **Border:** `0.8px solid #241208`
- **Button radius:** `0px` (sharp corners always)
- **Motion:** 300ms, `cubic-bezier(0.4, 0, 0.2, 1)`, hover = color change only
- **Scroll reveal:** IntersectionObserver → `.ab-in` class (no library)

## Component Map
| File | Status | Notes |
|---|---|---|
| `src/Hero.jsx` | ✅ | Full-screen video BG, bottom-anchored headline, staggered CSS anim |
| `src/About.jsx` | ✅ | Two-col heritage section, ghost year "1985", stats grid, outline CTA |
| `src/Facilities.jsx` | ✅ | |
| `src/FeaturedRooms.jsx` | ✅ | Drag-to-scroll card carousel, snap-to-center |
| `src/Testimonials.jsx` | ✅ | Marquee, pauses when offscreen (IntersectionObserver) |
| `src/Location.jsx` | ✅ | Editorial split layout, sticky map theatre |
| `src/FinaleInterlude.jsx` | ✅ | |
| `src/Footer.jsx` | ✅ | |
| `src/Navbar.jsx` | ✅ | |
| `src/Preloader.jsx` | ✅ | |
| `src/Cursor.jsx` | ✅ | |

## Performance Rules
- Testimonials marquee pauses when section is offscreen → reduces idle CPU/GPU load.
- Framer Motion reveal variants: `opacity + translateY` only (no scale) in Footer / Testimonial / Finale.
- Heavy ambient overlays must be conditional on device capability (grain layer in `App.jsx`).
- **FeaturedRooms:** avoid per-frame CSS `filter` changes; avoid duplicate snap calls after drag. Use non-linear easing for distance-to-transform (not purely linear) to make center-locking feel natural.

## Code Conventions
- All components are function components with named exports.
- Tailwind utility classes used inline; custom CSS in `src/index.css` / `src/App.css`.
- No CSS-in-JS; no styled-components.
- Keep animation logic co-located with the component it animates.
- `src/assets/` holds all static images/videos.
