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
            <Button render={<Link href="/contact" />} variant="secondary" size="lg">
              Start a Conversation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
