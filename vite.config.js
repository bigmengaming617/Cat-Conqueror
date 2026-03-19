import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    hmr: true, // Change this line to false disable auto-refreshing.
  }
})
