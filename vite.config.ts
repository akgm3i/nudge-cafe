/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/nudge-cafe/',
  plugins: [react()],
  optimizeDeps: {
    include: ['zustand'],
  },
  test: {
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
