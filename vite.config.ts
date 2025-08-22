/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/cocologic-cafe/',
  plugins: [react()],
  test: {
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
