### Task 13: Static Export Configuration & Final Verification

**Files:**
- Modify: `next.config.ts`
- Create: none

**Interfaces:**
- Consumes: all existing files
- Produces: working static export in `out/` directory

- [ ] **Step 1: Update `next.config.ts` for static export**

Read the current `next.config.ts`, then replace with:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes successfully, creates `out/` directory with static HTML files.

- [ ] **Step 3: Verify output structure**

```bash
Get-ChildItem -Recurse out\ | Select-Object -First 30
```

Expected: `out/index.html`, `out/services.html`, `out/about.html`, `out/contact.html` plus JS/CSS assets.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts && git commit -m "feat: configure static export and verify production build"
```
