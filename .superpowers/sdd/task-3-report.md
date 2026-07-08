# Task 3 Report: shadcn/ui Init & Core Components

## Status: DONE_WITH_CONCERNS

## Commits
- `ffd0b1f` - feat: initialize shadcn/ui with core components

## Files Created
- `components.json` - shadcn configuration (base-nova preset, neutral, CSS variables, src/src, RSC, @/* alias)
- `src/components/ui/button.tsx` - Button component (uses @base-ui/react/button + CVA)
- `src/components/ui/card.tsx` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction
- `src/components/ui/input.tsx` - Input component (uses @base-ui/react/input)
- `src/components/ui/textarea.tsx` - Textarea component (native HTML textarea)
- `src/components/ui/label.tsx` - Label component (native HTML label)
- `src/components/ui/badge.tsx` - Badge component (uses @base-ui/react/merge-props + useRender + CVA)
- `src/components/ui/separator.tsx` - Separator component (uses @base-ui/react/separator)
- `src/components/ui/field.tsx` - Field system (replaces v2 form.tsx; Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldContent, FieldTitle, FieldSeparator)

## Files Modified
- `src/app/globals.css` - Added `--color-primary`, `--color-primary-foreground`, `--color-secondary`, `--color-secondary-foreground` to @theme inline block for shadcn component compatibility
- `package.json` / `package-lock.json` - Added `@base-ui/react` dependency

## Test Summary
- `npm run build` passes with zero TypeScript errors, zero compilation errors
- All routes compile: `/` and `/_not-found`

## Concerns
1. **form.tsx vs field.tsx**: shadcn v4 does not include a `form` component. The v4 equivalent is `field` which provides `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, etc. instead of the v2 `FormField`, `FormItem`, `FormMessage` pattern. The brief expected the v2 form wrapper; downstream tasks that import from `@/components/ui/form` will need to use `@/components/ui/field` instead.
2. **shadcn version mismatch**: The brief was written for shadcn v2/v3 (style=default, baseColor=neutral). shadcn v4 uses presets (base-nova) and a different component library (@base-ui/react instead of Radix UI). Components have different APIs.
3. **CSS variable semantics**: Added `--color-primary`, `--color-primary-foreground`, `--color-secondary`, `--color-secondary-foreground` to the @theme block. These weren't in the Task 2 craft theme but shadcn v4 components require them for `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground` classes. The primary color is mapped to the craft accent color (#c68e3c).
4. **Missing input-group components**: The react-hook-form examples in shadcn v4 docs reference `InputGroup`, `InputGroupTextarea`, `InputGroupAddon`, `InputGroupText` components which were not installed (not in the brief's component list).

## Verification
- [x] shadcn/ui initialized (components.json created)
- [x] All listed components installed: button, card, input, textarea, label, badge, separator, field
- [x] globals.css craft theme preserved with --radius: 0.5rem
- [x] Build passes (npm run build)
- [x] Committed
