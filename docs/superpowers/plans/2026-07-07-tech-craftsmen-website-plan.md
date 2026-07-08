# Tech Craftsmen Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static institutional website for Tech Craftsmen (IT services) using Next.js 15, TypeScript, Tailwind CSS 4, and shadcn/ui.

**Architecture:** Static export (`output: 'export'`) with App Router. All content from TypeScript data files. Contact form uses Zod + React Hook Form with mailto link generation. Craft-themed dark palette with warm amber accents.

**Tech Stack:** Next.js 15, TypeScript strict, Tailwind CSS 4, shadcn/ui, Zod, React Hook Form, lucide-react, next/font (Playfair Display, Inter, JetBrains Mono)

## Global Constraints

- `next.config.ts` must set `output: 'export'` for static generation
- Dark-only theme (no light mode toggle) with charcoal backgrounds and amber accents
- All page content sourced from `src/lib/data/*.ts` — no CMS, no DB, no API calls
- Contact form validates with Zod, constructs mailto link on submit — no backend
- Playfair Display for headings, Inter for body, JetBrains Mono for code spans
- Company email: `hello@techcraftsmen.com`
- Company name: `Tech Craftsmen` (plural)
- All components use `'use client'` only when necessary (interactivity, hooks); pages default to server components
- Mobile-first responsive: sm, md, lg, xl breakpoints

---

### Task 1: Project Scaffolding

**Files:**
- Create: entire Next.js project via `create-next-app`
- Modify: none yet

**Interfaces:**
- Consumes: nothing
- Produces: working `next dev` server, project structure

- [ ] **Step 1: Scaffold Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --no-git
```

- [ ] **Step 2: Install dependencies**

```bash
npm install zod react-hook-form @hookform/resolvers lucide-react next-themes class-variance-authority clsx tailwind-merge
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js starts successfully on localhost:3000, shows default page.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with core dependencies"
```

---

### Task 2: Theme & Global Styles

**Files:**
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`, `tailwind.config.ts` (or remove if TWCSS4)

**Interfaces:**
- Consumes: nothing
- Produces: `cn()` utility, CSS custom properties for craft theme, font imports

- [ ] **Step 1: Create cn utility**

Write `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-background: #1a1a1a;
  --color-background-secondary: #262626;
  --color-foreground: #f5f0eb;
  --color-foreground-muted: #a39e96;
  --color-accent: #c68e3c;
  --color-accent-hover: #b87333;
  --color-card: #262626;
  --color-card-foreground: #f5f0eb;
  --color-border: #3d3a35;
  --color-input: #1a1a1a;
  --color-ring: #c68e3c;
  --color-destructive: #dc2626;
  --color-muted: #2a2a2a;
  --color-muted-foreground: #a39e96;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius: 0.5rem;
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts src/app/globals.css && git commit -m "feat: add craft theme CSS variables and cn utility"
```

---

### Task 3: shadcn/ui Initialization & Core Components

**Files:**
- Create: `components.json`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/ui/form.tsx`, `src/components/ui/label.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/separator.tsx`

**Interfaces:**
- Consumes: `src/lib/utils.ts` (`cn`)
- Produces: shadcn Button, Card, Input, Textarea, Form (with Label, FormField, FormItem, FormMessage), Badge, Separator

- [ ] **Step 1: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: TypeScript=yes, style=default, base color=neutral, CSS variables=yes, use src/src, RSC=yes, alias=@/*.

This creates `components.json`.

- [ ] **Step 2: Add shadcn components**

```bash
npx shadcn@latest add button card input textarea form label badge separator
```

- [ ] **Step 3: Update shadcn CSS variables for craft theme**

After shadcn init, it creates CSS variables in globals.css. The `@theme inline` block from Task 2 already covers the palette. Verify the generated `src/app/globals.css` doesn't conflict. If shadcn overwrote globals.css, restore the content from Task 2 Step 2 and ensure these additional variables are present:

```css
--radius: 0.5rem;
```

- [ ] **Step 4: Verify components exist and compile**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no TypeScript or build errors related to shadcn components.

- [ ] **Step 5: Commit**

```bash
git add components.json src/components/ui/ src/app/globals.css && git commit -m "feat: initialize shadcn/ui with core components"
```

---

### Task 4: Font Configuration

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: CSS variables `--font-heading`, `--font-body`, `--font-mono` set on `<body>`

- [ ] **Step 1: Update root layout with fonts**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tech Craftsmen | Custom Software, Cloud & DevOps",
  description:
    "Tech Craftsmen delivers custom software development, cloud consulting, and DevOps solutions. We craft reliable digital products with precision and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx && git commit -m "feat: configure Playfair Display, Inter, and JetBrains Mono fonts"
```

---

### Task 5: Data Files

**Files:**
- Create: `src/lib/data/company.ts`, `src/lib/data/navigation.ts`, `src/lib/data/services.ts`, `src/lib/data/testimonials.ts`, `src/lib/data/team.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `COMPANY: { name: string; email: string; phone: string; address: string; tagline: string }`
  - `NAV_ITEMS: { label: string; href: string }[]`
  - `SERVICES: { id: string; title: string; description: string; icon: string; details: string[]; technologies: string[] }[]`
  - `TESTIMONIALS: { id: string; quote: string; author: string; role: string; company: string }[]`
  - `TEAM_MEMBERS: { id: string; name: string; role: string; bio: string }[]`

- [ ] **Step 1: Create `src/lib/data/company.ts`**

```typescript
export const COMPANY = {
  name: "Tech Craftsmen",
  email: "hello@techcraftsmen.com",
  phone: "+1 (555) 123-4567",
  address: "San Francisco, CA",
  tagline: "Software crafted with precision. Infrastructure built to last.",
};
```

- [ ] **Step 2: Create `src/lib/data/navigation.ts`**

```typescript
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
```

- [ ] **Step 3: Create `src/lib/data/services.ts`**

```typescript
import { Code2, Cloud, GitFork } from "lucide-react";

export const SERVICES = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "We build tailored software solutions that solve real business problems — from web applications to backend systems, APIs, and integrations.",
    icon: "Code2",
    details: [
      "Full-stack web application development",
      "API design and system integrations",
      "Legacy system modernization",
      "Performance optimization and scaling",
      "Technology consulting and architecture",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: "cloud-consulting",
    title: "Cloud Consulting",
    description:
      "We help you navigate the cloud landscape — designing, migrating, and optimizing infrastructure on AWS, Azure, or GCP.",
    icon: "Cloud",
    details: [
      "Cloud strategy and architecture design",
      "Migration planning and execution",
      "Cost optimization and governance",
      "Multi-cloud and hybrid setups",
      "Disaster recovery and high availability",
    ],
    technologies: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
  },
  {
    id: "devops",
    title: "DevOps",
    description:
      "We streamline your delivery pipeline — automating builds, tests, deployments, and monitoring for faster, more reliable releases.",
    icon: "GitFork",
    details: [
      "CI/CD pipeline setup and optimization",
      "Infrastructure as Code (IaC)",
      "Containerization and orchestration",
      "Monitoring, logging, and alerting",
      "Security and compliance automation",
    ],
    technologies: [
      "GitHub Actions",
      "Jenkins",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Prometheus",
      "Grafana",
    ],
  },
];
```

- [ ] **Step 4: Create `src/lib/data/testimonials.ts`**

```typescript
export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Tech Craftsmen transformed our legacy system into a modern, scalable platform. Their attention to detail and engineering rigor is unmatched.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Finova Technologies",
  },
  {
    id: "2",
    quote:
      "Our cloud migration was seamless. They handled everything from architecture to execution. Downtime was zero. We couldn't be happier.",
    author: "Marcus Rivera",
    role: "VP of Engineering",
    company: "Streamline Health",
  },
  {
    id: "3",
    quote:
      "The DevOps pipeline they built cut our deployment time from hours to minutes. Our team can now ship with confidence multiple times a day.",
    author: "Elena Kowalski",
    role: "Engineering Manager",
    company: "DataPulse Analytics",
  },
];
```

- [ ] **Step 5: Create `src/lib/data/team.ts`**

```typescript
export const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Founder & Lead Engineer",
    bio: "15 years of software engineering experience. Previously led engineering teams at two Fortune 500 companies. Passionate about clean architecture and pragmatic solutions.",
  },
  {
    id: "2",
    name: "Jordan Park",
    role: "Cloud Architect",
    bio: "AWS and GCP certified architect with deep expertise in distributed systems. Helped 30+ companies migrate to the cloud with zero data loss.",
  },
  {
    id: "3",
    name: "Taylor Reed",
    role: "DevOps Engineer",
    bio: "Infrastructure automation specialist. Built CI/CD pipelines processing 10,000+ deployments per month. Open source contributor to Terraform and Kubernetes ecosystems.",
  },
  {
    id: "4",
    name: "Morgan Walsh",
    role: "Full-Stack Developer",
    bio: "Full-stack developer focused on React and Node.js ecosystems. Specializes in building performant, accessible web applications with modern tooling.",
  },
];
```

- [ ] **Step 6: Verify TypeScript compilation**

```bash
npx tsc --noEmit 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/data/ && git commit -m "feat: add static data files for company, navigation, services, testimonials, and team"
```

---

### Task 6: Layout Components

**Files:**
- Create: `src/components/layout/container.tsx`, `src/components/layout/section.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`

**Interfaces:**
- Consumes: `src/lib/data/navigation.ts` (NAV_ITEMS), `src/lib/data/company.ts` (COMPANY), `src/lib/utils.ts` (cn), shadcn Button
- Produces: `<Container>`, `<Section>`, `<Header>`, `<Footer>`

- [ ] **Step 1: Create `src/components/layout/container.tsx`**

```typescript
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/section.tsx`**

```typescript
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/layout/header.tsx`**

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/data/navigation";
import { COMPANY } from "@/lib/data/company";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            {COMPANY.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-accent",
                  pathname === item.href
                    ? "text-accent font-medium"
                    : "text-foreground-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm transition-colors hover:text-accent",
                    pathname === item.href
                      ? "text-accent font-medium"
                      : "text-foreground-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/components/layout/footer.tsx`**

```typescript
import Link from "next/link";
import { COMPANY } from "@/lib/data/company";
import { NAV_ITEMS } from "@/lib/data/navigation";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <Container>
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {COMPANY.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Software crafted with precision. Infrastructure built to last.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-foreground-muted">
              <a
                href={`mailto:${COMPANY.email}`}
                className="transition-colors hover:text-accent"
              >
                {COMPANY.email}
              </a>
              <span>{COMPANY.phone}</span>
              <span>{COMPANY.address}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 text-center text-sm text-foreground-muted">
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ && git commit -m "feat: add layout components (Header, Footer, Container, Section)"
```

---

### Task 7: Section Components — Service, Feature, CTA

**Files:**
- Create: `src/components/sections/service-card.tsx`, `src/components/sections/feature-list.tsx`, `src/components/sections/cta-banner.tsx`

**Interfaces:**
- Consumes: `src/lib/utils.ts` (cn), shadcn Card, shadcn Button
- Produces: `<ServiceCard>`, `<FeatureList>`, `<CTABanner>`

- [ ] **Step 1: Create `src/components/sections/service-card.tsx`**

```typescript
import Link from "next/link";
import { Code2, Cloud, GitFork, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  GitFork,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  id: string;
}

export function ServiceCard({ title, description, icon, id }: ServiceCardProps) {
  const Icon = iconMap[icon] || Code2;

  return (
    <Link href={`/services#${id}`}>
      <Card className="group h-full border-border bg-background-secondary transition-colors hover:border-accent/40">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon size={24} />
          </div>
          <CardTitle
            className="text-lg transition-colors group-hover:text-accent"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-foreground-muted">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/feature-list.tsx`**

```typescript
import { CheckCircle2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: "Engineering Craftsmanship",
    description:
      "We treat every project as a craft. Clean code, thorough testing, and thoughtful architecture are non-negotiable.",
  },
  {
    title: "Proven Experience",
    description:
      "Our team brings decades of combined experience across industries — fintech, healthcare, e-commerce, and more.",
  },
  {
    title: "Client Partnership",
    description:
      "We embed ourselves in your team. Clear communication, transparency, and shared ownership of outcomes.",
  },
  {
    title: "Pragmatic Approach",
    description:
      "We pick the right tool for the job. No hype-driven development — just solutions that work in the real world.",
  },
];

export function FeatureList() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {FEATURES.map((feature) => (
        <div key={feature.title} className="flex gap-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <h3 className="text-base font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/cta-banner.tsx`**

```typescript
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface CTABannerProps {
  title?: string;
  description?: string;
}

export function CTABanner({
  title = "Ready to Build Something Great?",
  description = "Let's discuss your project and find the right solution for your team.",
}: CTABannerProps) {
  return (
    <section className="bg-accent py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight text-background sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-background/80">{description}</p>
          <div className="mt-8">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/service-card.tsx src/components/sections/feature-list.tsx src/components/sections/cta-banner.tsx && git commit -m "feat: add ServiceCard, FeatureList, and CTABanner section components"
```

---

### Task 8: Section Components — Hero, Testimonials

**Files:**
- Create: `src/components/sections/hero-section.tsx`, `src/components/sections/testimonial-card.tsx`, `src/components/sections/testimonials.tsx`

**Interfaces:**
- Consumes: `src/lib/data/company.ts` (COMPANY), `src/lib/data/testimonials.ts` (TESTIMONIALS), `src/lib/utils.ts` (cn), shadcn Button, Card
- Produces: `<HeroSection>`, `<TestimonialCard>`, `<Testimonials>`

- [ ] **Step 1: Create `src/components/sections/hero-section.tsx`**

```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {COMPANY.name}
          </h1>
          <p className="mt-4 text-lg text-accent sm:text-xl" style={{ fontFamily: "var(--font-heading)" }}>
            {COMPANY.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            We are a team of engineers who treat software as a craft. From custom
            application development to cloud architecture and DevOps automation,
            we build systems that are reliable, maintainable, and built to evolve
            with your business.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/testimonial-card.tsx`**

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <Card className="h-full border-border bg-background-secondary">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <Quote className="mb-4 h-6 w-6 text-accent/40" />
          <p className="text-sm leading-relaxed text-foreground-muted italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-foreground-muted">
            {role}, {company}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/testimonials.tsx`**

```typescript
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { TestimonialCard } from "@/components/sections/testimonial-card";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <TestimonialCard
          key={t.id}
          quote={t.quote}
          author={t.author}
          role={t.role}
          company={t.company}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero-section.tsx src/components/sections/testimonial-card.tsx src/components/sections/testimonials.tsx && git commit -m "feat: add HeroSection, TestimonialCard, and Testimonials section components"
```

---

### Task 9: Home Page Assembly

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: all layout and section components, data files
- Produces: complete home page

- [ ] **Step 1: Update root layout to include Header and Footer**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tech Craftsmen | Custom Software, Cloud & DevOps",
  description:
    "Tech Craftsmen delivers custom software development, cloud consulting, and DevOps solutions. We craft reliable digital products with precision and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write home page**

Replace `src/app/page.tsx`:

```typescript
import { SERVICES } from "@/lib/data/services";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServiceCard } from "@/components/sections/service-card";
import { FeatureList } from "@/components/sections/feature-list";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Section className="bg-background-secondary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What We Do
            </h2>
            <p className="mt-4 text-foreground-muted">
              We offer end-to-end technology services — from the first line of
              code to production infrastructure.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why Choose Us
            </h2>
            <p className="mt-4 text-foreground-muted">
              We don&apos;t just write code. We build lasting partnerships
              grounded in technical excellence.
            </p>
          </div>
          <div className="mt-12">
            <FeatureList />
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Our Clients Say
            </h2>
            <p className="mt-4 text-foreground-muted">
              Trusted by teams who value quality and reliability.
            </p>
          </div>
          <div className="mt-12">
            <Testimonials />
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors. If there's a duplicate metadata export error, remove the metadata from layout.tsx and keep it only in the root layout.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx && git commit -m "feat: assemble home page with all sections"
```

---

### Task 10: Services Page

**Files:**
- Create: `src/components/sections/service-detail.tsx`, `src/app/services/page.tsx`

**Interfaces:**
- Consumes: `src/lib/data/services.ts` (SERVICES), `src/lib/utils.ts` (cn), shadcn components, layout components
- Produces: `<ServiceDetail>`, complete `/services` page

- [ ] **Step 1: Create `src/components/sections/service-detail.tsx`**

```typescript
import { Code2, Cloud, GitFork, CheckCircle2, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  GitFork,
};

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  technologies: string[];
}

export function ServiceDetail({
  id,
  title,
  description,
  icon,
  details,
  technologies,
}: ServiceDetailProps) {
  const Icon = iconMap[icon] || Code2;

  return (
    <section id={id} className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon size={28} />
          </div>
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h3>
          <p className="mt-4 leading-relaxed text-foreground-muted">
            {description}
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
            What We Offer
          </h4>
          <ul className="space-y-3">
            {details.map((detail) => (
              <li key={detail} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="border-accent/30 text-accent">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/app/services/page.tsx`**

```typescript
import type { Metadata } from "next";
import { SERVICES } from "@/lib/data/services";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CTABanner } from "@/components/sections/cta-banner";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Services | Tech Craftsmen",
  description:
    "Custom software development, cloud consulting, and DevOps services tailored to your business needs.",
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Services
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              End-to-end technology services — from concept to production, and
              everything in between.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary">
        <Container>
          <div className="space-y-12">
            {SERVICES.map((service, index) => (
              <div key={service.id}>
                {index > 0 && <Separator className="mb-12" />}
                <ServiceDetail
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  details={service.details}
                  technologies={service.technologies}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/service-detail.tsx src/app/services/ && git commit -m "feat: add services page with detailed service breakdowns"
```

---

### Task 11: About Page

**Files:**
- Create: `src/components/sections/team-member-card.tsx`, `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `src/lib/data/team.ts` (TEAM_MEMBERS), `src/lib/data/company.ts` (COMPANY), shadcn Card
- Produces: `<TeamMemberCard>`, complete `/about` page

- [ ] **Step 1: Create `src/components/sections/team-member-card.tsx`**

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
}

export function TeamMemberCard({ name, role, bio }: TeamMemberCardProps) {
  return (
    <Card className="h-full border-border bg-background-secondary">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-foreground-muted">
          <User size={36} />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-accent">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create `src/app/about/page.tsx`**

```typescript
import type { Metadata } from "next";
import { COMPANY } from "@/lib/data/company";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TeamMemberCard } from "@/components/sections/team-member-card";

export const metadata: Metadata = {
  title: "About | Tech Craftsmen",
  description: "Learn about Tech Craftsmen — our story, mission, and the team behind the craft.",
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              About {COMPANY.name}
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              We believe great software is built with care, not just code.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Story
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-foreground-muted">
              <p>
                {COMPANY.name} was founded on a simple idea: software engineering
                is a craft, not a commodity. In an industry that often prioritizes
                speed over quality, we chose a different path.
              </p>
              <p>
                We bring together senior engineers who have shipped products at
                scale — across startups and Fortune 500 companies — and share a
                commitment to building things the right way. Every architecture
                decision is intentional. Every line of code is reviewed.
              </p>
              <p>
                Our clients stay with us because we deliver: reliable systems,
                clear communication, and a partnership that extends beyond the
                initial build.
              </p>
            </div>

            <h2
              className="mt-12 text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Mission
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-accent">Quality First</h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  We never compromise on testing, code review, or architecture.
                  Technical debt is debt we refuse to accumulate.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent">Client Success</h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  Your goals are our goals. We measure success by the value we
                  deliver, not the hours we bill.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent">Continuous Growth</h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  Technology evolves fast. We invest in learning, open source,
                  and staying at the forefront of our craft.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Meet the Team
            </h2>
            <p className="mt-4 text-foreground-muted">
              Experienced engineers who take pride in their work.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/team-member-card.tsx src/app/about/ && git commit -m "feat: add about page with story, mission, and team sections"
```

---

### Task 12: Contact Page

**Files:**
- Create: `src/lib/validations/contact.ts`, `src/components/sections/contact-form.tsx`, `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `src/lib/data/company.ts` (COMPANY), `src/lib/utils.ts` (cn), shadcn Form components, shadcn Button, zod, react-hook-form, @hookform/resolvers
- Produces: Zod contact schema, `<ContactForm>`, complete `/contact` page

- [ ] **Step 1: Create `src/lib/validations/contact.ts`**

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Create `src/components/sections/contact-form.tsx`**

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { COMPANY } from "@/lib/data/company";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    const subject = `Contact from ${data.name}`;
    const body = [
      data.message,
      "",
      `— ${data.name}`,
      data.email,
      data.company ? `Company: ${data.company}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project..."
                  className="min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </form>
    </Form>
  );
}
```

- [ ] **Step 3: Create `src/app/contact/page.tsx`**

```typescript
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact | Tech Craftsmen",
  description: "Get in touch with Tech Craftsmen. Let's discuss your project.",
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              Have a project in mind? Let&apos;s talk about how we can help.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-background-secondary">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact Info
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Reach out and we&apos;ll get back to you within one business day.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-accent" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {COMPANY.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>{COMPANY.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{COMPANY.address}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/validations/ src/components/sections/contact-form.tsx src/app/contact/ && git commit -m "feat: add contact page with Zod-validated form and mailto integration"
```

---

### Task 13: Static Export Configuration & Final Verification

**Files:**
- Modify: `next.config.ts`
- Create: none

**Interfaces:**
- Consumes: all existing files
- Produces: working static export in `out/` directory

- [ ] **Step 1: Update `next.config.ts` for static export**

Read the current `next.config.ts`, then replace with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes successfully, creates `out/` directory with static HTML files.

- [ ] **Step 3: Verify output structure**

```bash
Get-ChildItem -Recurse out\ | Select-Object -First 30
```

Expected: `out/index.html`, `out/services.html`, `out/about.html`, `out/contact.html` plus JS/CSS assets.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts && git commit -m "feat: configure static export and verify production build"
```
