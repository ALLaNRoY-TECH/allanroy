# Engineering Standards & Verification

This document outlines the engineering discipline, testing process, and deployment standards maintained for this portfolio. While a comprehensive automated test suite (e.g., Playwright/Cypress) is not implemented for this static portfolio, strict verification steps are enforced to ensure production readiness.

## 1. Automated Verification Pipeline (CI)

Every push and pull request to the `main` branch is validated by GitHub Actions (`.github/workflows/ci.yml`). The pipeline will fail if any of the following checks do not pass:

- **Dependency Installation**: `npm ci` ensures reproducible builds.
- **Linting**: `npm run lint` enforces strict ESLint rules and Next.js best practices, catching unused imports, syntax errors, and potential bugs.
- **Type Checking**: `npx tsc --noEmit` verifies strict TypeScript adherence across the entire codebase without generating output files.
- **Production Build**: `npm run build` verifies that all static generation (SSG) succeeds and Turbopack can successfully compile the bundle without errors or warnings.

## 2. Accessibility (a11y) Standards

The portfolio is designed to be usable by everyone. 
- All custom interactive elements (e.g., modals, architecture nodes, memory archive cards) use appropriate ARIA attributes (`role="button"`, `aria-label`).
- Full keyboard navigation is supported (`tabIndex={0}`, `Enter`/`Space` handlers).
- Focus states (`focus-visible:ring-2 focus-visible:ring-accent`) are clearly defined for all interactive components.
- Color contrast meets WCAG minimums where applicable.

## 3. Performance Optimizations

- **Media**: Local images are strictly rendered using the `next/image` component to leverage automated WebP conversion, responsive sizing (`sizes` attributes), and lazy loading.
- **Static Generation**: The portfolio utilizes Next.js App Router static rendering. Dynamic data is fetched locally at build time, ensuring sub-second Time To First Byte (TTFB).
- **Bundle Optimization**: Tree-shaking is enabled, and components are dynamically imported where sensible to keep the initial JavaScript payload small.

## 4. Manual QA Checklist

Before any major release (e.g., `V1.2`), the following manual checks are performed:
- [x] Zero React console warnings or errors.
- [x] Zero hydration mismatches on page load.
- [x] Responsive layout verified across mobile (390px), tablet (768px), and desktop (1440px).
- [x] Modals correctly trap scroll and listen to `Escape` key events.
- [x] Smooth scroll (Lenis) functions without jitter across browsers.

## 5. Deployment

The application is deployed on **Vercel**. 
The Vercel Edge Network handles caching and global distribution of the statically generated assets, providing a seamless and highly available experience for users worldwide.
