import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Open Graph images must be absolute URLs. Set VITE_SITE_URL (e.g. https://wiki.example.com) at build time; on Vercel it falls back to the production domain.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL
  const siteUrl = (env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : '')).replace(/\/$/, '')
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
