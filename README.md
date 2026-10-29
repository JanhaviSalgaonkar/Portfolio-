# Janhavi Salgaonkar: 3D Interactive React Portfolio

A responsive, performance-optimised developer portfolio built with **React 18 + Vite**.
Sections: About (3D hero), Projects (filter + tilt cards), Skills, Resume, Contact. Stack: React 18, Vite, Three.js.

**Interactivity:** 3D planet that follows the cursor, typing intro, cursor glow, scroll progress bar, tilting project cards, filterable projects, animated skill bars.

**Live site:** _add your URL here_  
**Screenshots:** _add `docs/desktop.png` and `docs/mobile.png` here_

## Quick start
```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # serve dist/ locally to verify
```
Edit `src/data.js` to change all content. Put your resume at `public/resume.pdf`.

## Performance work
| Technique | Where |
|---|---|
| Component lazy loading (`React.lazy` + `Suspense`) | `src/App.jsx` (Projects, Skills, Resume, Contact are separate chunks) |
| Viewport-triggered loading (`IntersectionObserver`) | `LazySection` in `src/App.jsx`: chunks download only when scrolled near |
| Image lazy loading | `loading="lazy"`, `decoding="async"`, explicit width/height (no layout shift) |
| Lazy-loaded 3D (Three.js in its own chunk) | `Hero3D` via `React.lazy` in `src/App.jsx` |
| JS + CSS minification | Vite defaults (esbuild / cssMinify), set explicitly in `vite.config.js` |
| Vendor chunk splitting | `manualChunks` in `vite.config.js` for better caching |

## Verifying the production build
1. `npm run build && npm run preview` (http://localhost:4173)
2. Check: nav links scroll, mobile menu toggles, images load lazily (DevTools → Network → Img while scrolling), resume downloads, contact form opens mail client.
3. Run Lighthouse (Chrome DevTools) on the preview URL; aim for 90+ on Performance, Accessibility, SEO.

## Deployment

### Option A: Netlify (recommended; free SSL)
1. Push to GitHub. 
2. Netlify → **Add new site → Import from Git** → pick repo. Build `npm run build`, publish `dist` (already in `netlify.toml`).
3. **Domain management → Add custom domain**. Either point your registrar's DNS to Netlify (CNAME `www` → `<site>.netlify.app`, plus A/ALIAS for the apex) or delegate nameservers to Netlify.
4. **HTTPS → Provision certificate** (Let's Encrypt, automatic). Enable *Force HTTPS*.

### Option B: Vercel
Import repo → framework preset *Vite* → Deploy. Add domain under **Settings → Domains**; SSL is automatic.

### Option C: GitHub Pages
1. In `vite.config.js` set `base: '/<repo-name>/'`.
2. `npm run build && npm run deploy` (publishes `dist` to the `gh-pages` branch).
3. Repo **Settings → Pages** → branch `gh-pages`. Add custom domain there and tick *Enforce HTTPS*.

## Post-deploy testing checklist
- [ ] Loads over HTTPS with no mixed-content warnings
- [ ] Chrome, Firefox, Safari, Edge (latest): layout, nav, form
- [ ] Phone (iOS Safari / Android Chrome) + DevTools device emulation at 320, 375, 768, 1024, 1440 px
- [ ] Light and dark mode
- [ ] Lighthouse + keyboard-only navigation

## Challenges & solutions (update with your own)
- **Layout shift from images** → fixed `width`/`height` attributes plus `height:auto`.
- **Sections below the fold bloating the first load** → `React.lazy` chunks gated by `IntersectionObserver`.
- **Hash links vs. lazy sections** → each `<section id>` wrapper renders immediately (with a min-height), so anchors always resolve.
- **GitHub Pages 404 / broken asset paths** → set Vite `base` to the repo name.
- **SPA refresh 404 on Netlify** → redirect rule in `netlify.toml`.
