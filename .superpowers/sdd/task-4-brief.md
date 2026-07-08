### Task 4: Font Configuration

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: CSS variables `--font-heading`, `--font-body`, `--font-mono` set on `<body>`

- [ ] **Step 1: Update root layout with fonts**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tech Craftsmen | Custom Software, Cloud & DevOps",
  description:
    "Tech Craftsmen delivers custom software development, cloud consulting, and DevOps solutions. We craft reliable digital products with precision and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx && git commit -m "feat: configure Playfair Display, Inter, and JetBrains Mono fonts"
```

---

