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

