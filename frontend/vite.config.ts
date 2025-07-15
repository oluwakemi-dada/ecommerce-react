import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), Checker({ typescript: true })],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
});
