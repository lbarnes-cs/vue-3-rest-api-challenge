import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    include: ['tests/**/*.spec.ts', 'src/**/*.spec.ts'],
    css: false,
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
