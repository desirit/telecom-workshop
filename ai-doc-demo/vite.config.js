import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// In your Vite config (vite.config.js)
export default defineConfig({
  server: {
    proxy: {
      '/api/claude': {
        target: 'https://api.anthropic.com/v1/messages',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/claude/, '')
      }
    }
  }
})

