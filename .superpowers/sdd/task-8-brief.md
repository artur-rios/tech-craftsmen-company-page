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

