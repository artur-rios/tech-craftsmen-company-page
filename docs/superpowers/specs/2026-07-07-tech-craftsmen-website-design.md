# Tech Craftsmen — Institutional Website Design Spec

**Date:** 2026-07-07  
**Status:** Approved

## Overview

Institutional website for **Tech Craftsmen**, an IT services company specializing in custom software development, cloud consulting, and DevOps. Primary goals: generate leads and present the company.

## Tech Stack

- **Framework:** Next.js 15 (App Router, `output: 'export'` for static generation)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (themed via CSS variables)
- **Forms:** Zod + React Hook Form for validation
- **Icons:** lucide-react
- **Deployment:** Any static host (no server required)

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, service overview cards, why-choose-us, testimonials, CTA banner |
| `/services` | Services | Detailed breakdown of all three service offerings |
| `/about` | About | Company story, mission/values, team section |
| `/contact` | Contact | Zod-validated contact form with mailto link generation |

### Home (`/`)
- **Hero Section:** Full-width banner with company name, tagline, primary CTA ("Get in Touch" → /contact)
- **Services Overview:** 3 cards summarizing each service offering with icons and brief descriptions
- **Why Choose Us:** Feature list highlighting craftsmanship, experience, client focus
- **Testimonials:** 2-3 testimonial cards
- **CTA Banner:** Final call-to-action section at the bottom

### Services (`/services`)
- **Custom Software Development:** In-depth description, technology stack, process
- **Cloud Consulting:** Strategy, migration, optimization details
- **DevOps:** CI/CD, infrastructure as code, monitoring, automation

### About (`/about`)
- **Company Story:** Founding narrative, vision
- **Mission & Values:** Core principles
- **Team:** Placeholder team member cards with avatars, names, roles

### Contact (`/contact`)
- **Contact Form:** Name, email, company (optional), message fields
- **Form Behavior:** Validated via Zod schema on submit. On valid submission, constructs a `mailto:hello@techcraftsmen.com` link with subject and body, opens default email client
- **Contact Info:** Email address, phone placeholder, location

## Visual Identity: Craftsman/Warm

### Color Palette
- **Background Primary:** Dark charcoal (`#1A1A1A` / gray-950)
- **Background Secondary:** Slightly lighter charcoal (`#262626` / gray-900) for cards/sections
- **Accent Primary:** Warm amber (`#C68E3C`) for CTAs, links, highlights
- **Accent Secondary:** Copper (`#B87333`) for hover states, secondary elements
- **Text Primary:** Off-white/cream (`#F5F0EB`)
- **Text Secondary:** Warm gray (`#A39E96`)

### Typography
- **Headings:** Serif font (Playfair Display or similar via next/font) — evokes craftsmanship
- **Body:** Sans-serif (Inter via next/font) — clean, readable
- **Code/Technical:** Monospace (JetBrains Mono via next/font) for tech-related displays

### Design Motifs
- Generous whitespace and breathing room
- Cards with subtle warm-tinted borders and shadows
- Geometric/craft-inspired subtle decorative elements
- Amber-accented buttons and interactive elements
- Dark theme as default (the craftsman aesthetic)

## Component Architecture

### Layout Components
- `Header` — Sticky navigation bar with logo, nav links, contact CTA button
- `Footer` — Company info, quick links, contact details, copyright
- `Container` — Max-width wrapper for consistent content width
- `Section` — Page section wrapper with consistent vertical padding

### UI Components (shadcn/ui)
- `Button` — Primary (amber-filled), secondary (outline), ghost variants
- `Card` — Content card with craft-themed styling
- `Input`, `Textarea` — Form inputs
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` — React Hook Form integration
- `Badge` — Tag displays for technologies
- `Separator` — Section dividers
- `Accordion` — Expandable FAQ or service details

### Section Components
- `HeroSection` — Full-width hero banner with headline, subtext, CTA
- `ServiceCard` — Icon, title, description, link
- `ServiceDetail` — In-depth service presentation with features list
- `TestimonialCard` — Quote, author, company, role
- `CTABanner` — Compact call-to-action strip
- `FeatureList` — Icon + text rows for "why choose us"
- `TeamMemberCard` — Avatar placeholder, name, role, short bio
- `ContactForm` — Validated form with mailto submission

### Foundation Components
- `ThemeProvider` — CSS variable theming via Tailwind

## Data Layer

All content is static and defined in TypeScript data files:

```
src/lib/data/
  services.ts      — Service definitions (id, title, description, icon, features)
  testimonials.ts  — Testimonial entries (quote, author, company, role)
  team.ts          — Team members (name, role, bio, avatar placeholder)
  navigation.ts    — Nav items (label, href)
  company.ts       — Company info (name, email, phone, address)
```

No CMS, no database, no API calls at runtime (except mailto).

## Contact Form — Zod Schema

```typescript
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
```

On valid submit:
```typescript
const mailto = `mailto:hello@techcraftsmen.com?subject=Contact from ${data.name}&body=${encodeURIComponent(data.message + "\n\n— " + data.name + (data.company ? ", " + data.company : ""))}`;
window.location.href = mailto;
```

## Project Structure

```
tech-craftsmen-company-page/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, theme)
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Tailwind + CSS variables + theme
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── container.tsx
│   │   │   └── section.tsx
│   │   ├── sections/
│   │   │   ├── hero-section.tsx
│   │   │   ├── services-overview.tsx
│   │   │   ├── service-card.tsx
│   │   │   ├── service-detail.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── cta-banner.tsx
│   │   │   ├── feature-list.tsx
│   │   │   ├── team-member-card.tsx
│   │   │   └── contact-form.tsx
│   │   └── ui/                     # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── form.tsx
│   │       ├── label.tsx
│   │       ├── badge.tsx
│   │       ├── separator.tsx
│   │       └── accordion.tsx
│   └── lib/
│       ├── data/
│       │   ├── services.ts
│       │   ├── testimonials.ts
│       │   ├── team.ts
│       │   ├── navigation.ts
│       │   └── company.ts
│       ├── validations/
│       │   └── contact.ts          # Zod schema
│       └── utils.ts                # cn() helper
├── components.json                 # shadcn/ui config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Implementation Notes

- Use `next/font` for Playfair Display (headings), Inter (body), JetBrains Mono (code)
- Tailwind CSS 4 with `@theme` blocks for custom craft-themed design tokens
- shadcn/ui components installed via CLI, styled with craft palette CSS variables
- All pages are server components by default; contact form is a client component (`'use client'`)
- `next.config.ts` sets `output: 'export'`
- Contact form uses React Hook Form with `@hookform/resolvers` for Zod integration
- Static metadata per page via Next.js Metadata API
- Responsive design: mobile-first, breakpoints at sm, md, lg, xl

## Out of Scope

- CMS integration
- Blog / insights section
- Authentication
- Database
- i18n
- Dark/light mode toggle (dark-only, matching the craftsman aesthetic)
