import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['fsevents'], // Exclude fsevents from being bundled
  },
  build: {
    // The vendor-three chunk is intentionally large: it is three.js, it is
    // stable across deploys, and it is cached separately from the app code.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // The 3D stack is the bulk of the bundle and changes far less often
        // than the site code. Splitting it out keeps the app chunk small and
        // lets repeat visits reuse a cached vendor chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/[\\/]node_modules[\\/](three|three-stdlib|@react-three)[\\/]/.test(id)) {
            return 'vendor-three'
          }
          return undefined
        },
      },
    },
  },
})
