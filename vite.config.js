import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: process.env.PORT ? Number.parseInt(process.env.PORT) : 5174 },
  build: {
    rollupOptions: {
      output: {
        // Stable vendor chunks cache across deploys when only app code changes.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('motion')) return 'motion'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react')) return 'react'
        },
      },
    },
  },
})
