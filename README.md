# DJ ODED EL – Landing Page

Hebrew (RTL) one-page site for **ODED EL**, a DJ and producer from Rishon LeZion for weddings and events.

**Live:** https://www.djodedel.com

Built with React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion and Lenis.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run lint
```

## Editing content

Almost everything on the page comes from **`src/data/site.ts`**: contact details, social links, texts,
services, SoundCloud tracks, Instagram posts, gallery photos and testimonials.

- **Photos** – `public/photos/` (currently web-resolution copies from Oded's Instagram / SoundCloud;
  replace with originals under the same names).
- **Hero video** – `public/video/hero.{webm,mp4}` + `hero-poster.webp` (a 14-second loop from his promo reel).
- **Logo** – `public/brand/`, favicon and `public/og-image.jpg` (link-preview image).
- **Testimonials / videos** – the sections hide themselves while `TESTIMONIALS` / `VIDEOS` are empty.
- **Legal pages** – `privacy.html`, `terms.html`, `accessibility.html`, with their text in
  `src/legal/docs/`. Owner name, "last updated" date and accessibility contact are in `LEGAL` in `site.ts`.
  The privacy policy describes the site as it is today (no analytics, cookies or form service) – update it
  if any of those are added.

## Deployment

Every push to `main` builds and publishes the site to GitHub Pages via `.github/workflows/deploy.yml`
(repository **Settings → Pages → Source: GitHub Actions**, custom domain `www.djodedel.com`).

- **DNS (GoDaddy):** `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  and `CNAME www` → `eyal1999.github.io`. GitHub redirects `djodedel.com` to `www`.
- **Base path:** the workflow builds with `BASE_PATH=/`. Every asset URL goes through `asset()` / `HOME_URL`
  in `site.ts`, so building with `BASE_PATH=/<repo-name>/` also works if the custom domain is ever removed.
- The absolute `canonical` / `og:url` / `og:image` URLs in `index.html` point at the domain.
