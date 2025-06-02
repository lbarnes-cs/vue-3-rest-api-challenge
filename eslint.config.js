// eslint.config.js
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    ignores: [
      '**/node_modules/**',
      'dist/',
      'pnpm-lock.yaml',
      'package-lock.json',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // Enable TypeScript rules
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  eslintPluginPrettier,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'eol-last': ['error', 'always'],
      // Adding TypeScript-specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off', // You can adjust this based on preference
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on any usage
      '@typescript-eslint/consistent-type-definitions': 'off', // We want to use type, not forced to interface
    },
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
];
