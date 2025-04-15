import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify'; // Important for tree shaking

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue(), vuetify()],

  server: {
    port: 4000,
  },

  build: {
    assetsInlineLimit: 0, // avoids base64-ing small assets
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('components/description') ||
            id.includes('view/results')
          ) {
            return 'protocols-results';
          }
        },
      },
    },
  },

  // Global styles are only being implemented to components with style-scoped enabled
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/assets/styles/main.scss";`,
  //     },
  //   },
  // },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      provider: 'v8',
    },
    include: ['tests/**/*.spec.ts', 'src/**/*.spec.ts'],
    exclude: ['tests/e2e/**'],
    css: false,
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
