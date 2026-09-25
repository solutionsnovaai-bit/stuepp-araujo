import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const url = new URL(env.VITE_SITE_URL || 'https://stuepp-araujo-identidade.vercel.app')
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve usar HTTP ou HTTPS.')
  return {
    plugins: [react(), tailwindcss(), {
      name: 'stuepp-social-metadata',
      transformIndexHtml: (html: string) => html.replaceAll('__SITE_ORIGIN__', url.origin),
    }],
    server: { host: '0.0.0.0', port: 4173, strictPort: true },
    build: { target: 'es2022', sourcemap: false },
  }
})
