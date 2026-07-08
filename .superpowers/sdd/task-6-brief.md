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

