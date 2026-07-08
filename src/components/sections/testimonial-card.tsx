import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <Card className="h-full border-border bg-background-secondary">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div>
          <Quote className="mb-4 h-6 w-6 text-accent/40" />
          <p className="text-sm leading-relaxed text-foreground-muted italic">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-foreground-muted">
            {role}, {company}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
