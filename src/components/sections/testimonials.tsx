import { TESTIMONIALS } from "@/lib/data/testimonials";
import { TestimonialCard } from "@/components/sections/testimonial-card";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <TestimonialCard
          key={t.id}
          quote={t.quote}
          author={t.author}
          role={t.role}
          company={t.company}
        />
      ))}
    </div>
  );
}
