import eslint from '@eslint/js';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['.eslintrc.js', '.eslintrc.cjs', 'node_modules/', 'dist/', 'coverage/'],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // always look for Type definitions even if we don't find something that looks like source
        },
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [ // Настройка порядка импортов (по желанию)
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'prettier/prettier': 'error', // Включаем правила Prettier как ошибки ESLint
    },
  },
  {
    // Отключаем правила ESLint, которые конфликтуют с Prettier
    files: ['**/*.ts', '**/*.tsx'],
    ...eslintConfigPrettier,
  },
];
