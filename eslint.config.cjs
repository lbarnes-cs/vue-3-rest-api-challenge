const vue = require('eslint-plugin-vue');
const prettier = require('eslint-config-prettier');

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = async () => {
  const tsPlugin = require('@typescript-eslint/eslint-plugin');
  const tsParser = require('@typescript-eslint/parser');

  return [
    {
      files: ['**/*.ts', '**/*.vue'],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
        },
        globals: {
          defineProps: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          withDefaults: 'readonly',
        },
      },
      plugins: {
        vue,
        '@typescript-eslint': tsPlugin,
      },
      rules: {
        ...vue.configs['essential'].rules,
        ...tsPlugin.configs.recommended.rules,
      },
    },
    {
      ignores: ['**/dist/**'],
      rules: {
        ...prettier.rules,
      },
    },
  ];
};

module.exports = config();
