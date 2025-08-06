import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Removed the resource-override-helper plugin to prevent redirection
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow external access, not just localhost
    cors: true, // Enable CORS for all origins
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    },
    proxy: {
      // Handle requests from sb-admin.kido.vn
      '/api': {
        target: 'https://sb-admin.kido.vn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
