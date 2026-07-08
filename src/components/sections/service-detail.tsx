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
