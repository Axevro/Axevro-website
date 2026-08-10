import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Reachable on Wi-Fi / LAN (not only localhost)
    host: true,
    port: 5173,
    strictPort: false,
    cors: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    cors: true,
  },
})
