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
