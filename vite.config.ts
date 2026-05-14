import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'recharts': ['recharts'],
          'lucide': ['lucide-react'],
          'framer': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
