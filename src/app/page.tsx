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
