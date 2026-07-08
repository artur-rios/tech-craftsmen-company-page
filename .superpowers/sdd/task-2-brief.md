### Task 2: Theme & Global Styles

**Files:**
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`, `tailwind.config.ts` (or remove if TWCSS4)

**Interfaces:**
- Consumes: nothing
- Produces: `cn()` utility, CSS custom properties for craft theme, font imports

- [ ] **Step 1: Create cn utility**

Write `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --color-background: #1a1a1a;
  --color-background-secondary: #262626;
  --color-foreground: #f5f0eb;
  --color-foreground-muted: #a39e96;
  --color-accent: #c68e3c;
  --color-accent-hover: #b87333;
  --color-card: #262626;
  --color-card-foreground: #f5f0eb;
  --color-border: #3d3a35;
  --color-input: #1a1a1a;
  --color-ring: #c68e3c;
  --color-destructive: #dc2626;
  --color-muted: #2a2a2a;
  --color-muted-foreground: #a39e96;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius: 0.5rem;
}

* {
  border-color: var(--color-border);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts src/app/globals.css && git commit -m "feat: add craft theme CSS variables and cn utility"
```

---

