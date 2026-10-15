# DJ ODED EL – Landing Page

Hebrew (RTL) one-page site for **ODED EL**, a Tel Aviv–based DJ and producer for weddings and events.

**Live:** https://eyal1999.github.io/DJ_ODED_EL_Landing/

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
(repository **Settings → Pages → Source: GitHub Actions**). The workflow builds with
`BASE_PATH=/<repo-name>/`, and every asset URL goes through `asset()` / `HOME_URL` in `site.ts`, so the
site works both at the domain root and under the project sub-path.

If the site moves to its own domain, also update the absolute `og:url` / `og:image` URLs in `index.html`.
