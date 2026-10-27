"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/data/navigation";
import { COMPANY } from "@/lib/data/company";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  // trailingSlash: true makes usePathname() return /about/, the nav hrefs have none.
  const currentPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            {COMPANY.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-accent",
                  currentPath === item.href
                    ? "text-accent font-medium"
                    : "text-foreground-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button render={<Link href="/contact" />}>Get in Touch</Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm transition-colors hover:text-accent",
                    currentPath === item.href
                      ? "text-accent font-medium"
                      : "text-foreground-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button render={<Link href="/contact" />} className="mt-2 w-full">
                Get in Touch
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
