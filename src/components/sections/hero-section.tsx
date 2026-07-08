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
            <Button render={<Link href="/contact" />} size="lg">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button render={<Link href="/services" />} variant="outline" size="lg">
              Our Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
