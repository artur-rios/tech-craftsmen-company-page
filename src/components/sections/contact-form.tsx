"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Send } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { COMPANY } from "@/lib/data/company";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Your name" {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@company.com" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="company">Company (optional)</FieldLabel>
        <Input id="company" placeholder="Your company" {...register("company")} />
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          placeholder="Tell us about your project..."
          className="min-h-[140px]"
          {...register("message")}
        />
        <FieldError errors={[errors.message]} />
      </Field>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  );
}
