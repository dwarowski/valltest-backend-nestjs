import eslintPluginPrettier from 'eslint-plugin-prettier';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = [
    {
        files: ['**/*.ts', '**/*.tsx'], // Применяем правила к TypeScript файлам
        ignores: ['dist/**/*'], // Игнорируем скомпилированные файлы
        languageOptions: {
            parser: typescriptParser, // Используем TypeScript парсер
            project: ['./tsconfig.json'],
            sourceType: 'module', // Указываем тип модуля
        },
        plugins: {
            '@typescript-eslint': ts,
            'import': importPlugin
        },
        extends: [
            js.configs.recommended, // Рекомендованные правила ESLint
            ts.configs['recommended-type-checked'], // Рекомендованные правила TypeScript с проверкой типов
        ],
        rules: {
            ...ts.configs['stylistic-type-checked'].rules, // Добавляем стилистические правила TypeScript с проверкой типов
            'no-unused-vars': 'off', // Отключаем стандартное правило для неиспользуемых переменных
            '@typescript-eslint/no-unused-vars': 'warn', // Включаем правило TypeScript для неиспользуемых переменных
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',  // redundant but explicit
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/consistent-type-imports': 'warn', // Suggest consistent type imports
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...eslintPluginPrettier.configs.recommended.rules,
        },
    },
];

export default config;
