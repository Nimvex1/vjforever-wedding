import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/react')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
