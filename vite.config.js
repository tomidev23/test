import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
      '/storage': {
        target: 'https://assets.suitdev.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storage/, ''),
      }
    },
  },
});
