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
