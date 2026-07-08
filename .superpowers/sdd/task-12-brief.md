### Task 12: Contact Page

**Files:**
- Create: `src/lib/validations/contact.ts`, `src/components/sections/contact-form.tsx`, `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `src/lib/data/company.ts` (COMPANY), `src/lib/utils.ts` (cn), shadcn Form components, shadcn Button, zod, react-hook-form, @hookform/resolvers
- Produces: Zod contact schema, `<ContactForm>`, complete `/contact` page

- [ ] **Step 1: Create `src/lib/validations/contact.ts`**

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Create `src/components/sections/contact-form.tsx`**

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { COMPANY } from "@/lib/data/company";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    const subject = `Contact from ${data.name}`;
    const body = [
      data.message,
      "",
      `— ${data.name}`,
      data.email,
      data.company ? `Company: ${data.company}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project..."
                  className="min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </form>
    </Form>
  );
}
```

- [ ] **Step 3: Create `src/app/contact/page.tsx`**

```typescript
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
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/validations/ src/components/sections/contact-form.tsx src/app/contact/ && git commit -m "feat: add contact page with Zod-validated form and mailto integration"
```

---

