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

