import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

/** The landing page plus the standalone legal pages (multi-page build). */
const pages = ['index', 'privacy', 'terms', 'accessibility']

// https://vite.dev/config/
export default defineConfig({
  // '/' locally; the GitHub Pages workflow sets BASE_PATH=/<repo-name>/ for the project-site URL.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(pages.map((name) => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])),
    },
  },
})
