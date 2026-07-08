import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
}

export function TeamMemberCard({ name, role, bio }: TeamMemberCardProps) {
  return (
    <Card className="h-full border-border bg-background-secondary">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-foreground-muted">
          <User size={36} />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-accent">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
}
