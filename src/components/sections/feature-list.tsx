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
