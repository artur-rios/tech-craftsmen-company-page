### Task 1: Project Scaffolding

**Files:**
- Create: entire Next.js project via `create-next-app`
- Modify: none yet

**Interfaces:**
- Consumes: nothing
- Produces: working `next dev` server, project structure

- [ ] **Step 1: Scaffold Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --no-git
```

- [ ] **Step 2: Install dependencies**

```bash
npm install zod react-hook-form @hookform/resolvers lucide-react next-themes class-variance-authority clsx tailwind-merge
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js starts successfully on localhost:3000, shows default page.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with core dependencies"
```

---

