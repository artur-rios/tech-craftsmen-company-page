import Link from "next/link";
import { COMPANY } from "@/lib/data/company";
import { NAV_ITEMS } from "@/lib/data/navigation";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <Container>
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {COMPANY.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              Software crafted with precision. Infrastructure built to last.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-foreground-muted">
              <a
                href={`mailto:${COMPANY.email}`}
                className="transition-colors hover:text-accent"
              >
                {COMPANY.email}
              </a>
              <span>{COMPANY.phone}</span>
              <span>{COMPANY.address}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="py-6 text-center text-sm text-foreground-muted">
          &copy; {new Date().getFullYear()} {COMPANY.name}.{" "}
          <a
            href="https://github.com/artur-rios/tech-craftsmen-company-page/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Artur Rios Attribution License
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}
