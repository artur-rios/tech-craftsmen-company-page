### Task 3: shadcn/ui Initialization & Core Components

**Files:**
- Create: `components.json`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`, `src/components/ui/form.tsx`, `src/components/ui/label.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/separator.tsx`

**Interfaces:**
- Consumes: `src/lib/utils.ts` (`cn`)
- Produces: shadcn Button, Card, Input, Textarea, Form (with Label, FormField, FormItem, FormMessage), Badge, Separator

- [ ] **Step 1: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted: TypeScript=yes, style=default, base color=neutral, CSS variables=yes, use src/src, RSC=yes, alias=@/*.

This creates `components.json`.

- [ ] **Step 2: Add shadcn components**

```bash
npx shadcn@latest add button card input textarea form label badge separator
```

- [ ] **Step 3: Update shadcn CSS variables for craft theme**

After shadcn init, it creates CSS variables in globals.css. The `@theme inline` block from Task 2 already covers the palette. Verify the generated `src/app/globals.css` doesn't conflict. If shadcn overwrote globals.css, restore the content from Task 2 Step 2 and ensure these additional variables are present:

```css
--radius: 0.5rem;
```

- [ ] **Step 4: Verify components exist and compile**

```bash
npm run build 2>&1 | Select-String -Pattern "error"
```

Expected: no TypeScript or build errors related to shadcn components.

- [ ] **Step 5: Commit**

```bash
git add components.json src/components/ui/ src/app/globals.css && git commit -m "feat: initialize shadcn/ui with core components"
```

---

