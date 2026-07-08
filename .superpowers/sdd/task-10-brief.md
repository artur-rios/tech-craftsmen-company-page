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

