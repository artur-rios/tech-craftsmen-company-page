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

