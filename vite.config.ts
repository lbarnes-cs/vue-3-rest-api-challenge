import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

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
