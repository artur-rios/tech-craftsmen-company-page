import Link from "next/link";
import { Code2, Cloud, GitFork, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  GitFork,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  id: string;
}

export function ServiceCard({ title, description, icon, id }: ServiceCardProps) {
  const Icon = iconMap[icon] || Code2;

  return (
    <Link href={`/services#${id}`}>
      <Card className="group h-full border-border bg-background-secondary transition-colors hover:border-accent/40">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon size={24} />
          </div>
          <CardTitle
            className="text-lg transition-colors group-hover:text-accent"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-foreground-muted">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
