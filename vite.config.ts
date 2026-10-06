import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Open Graph images must be absolute URLs. Set VITE_SITE_URL (e.g. https://wiki.example.com) at build time.
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, '.', '').VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [
      react(),
      {
        name: 'site-url',
        transformIndexHtml: (html: string) => html.split('%SITE_URL%').join(siteUrl),
      },
    ],
  }
})
