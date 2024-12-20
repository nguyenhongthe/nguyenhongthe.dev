import { fixupConfigRules } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    {
        plugins: {
            '@stylistic': stylistic
        },

        ignores: [
            ".next/*",
            "postcss.config.js",
            "postcss.config.ts",
            "next.config.js",
            "next.config.ts",
            "next-env.d.ts",
            "withTwin.js",
            "tailwind.config.js",
            "tailwind.config.ts",
            "src/theme/*",
            "src/utils/*",
            ".eslintrc.cjs",
            "node_modules/*",
            "setupTests.ts",
            "src/app/global.css"
        ],
    },
    ...compat.extends('plugin:react/recommended', 'next/core-web-vitals'),
    ...fixupConfigRules(
        compat.extends('plugin:@typescript-eslint/recommended')
    ).map((config) => ({
        ...config,
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    })),
    {
        files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

        languageOptions: {
            parser: parserTs,
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/strict-boolean-expressions": "off",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-confusing-void-expression": "off",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "react-hooks/exhaustive-deps": "off",
            "react/no-unescaped-entities": "off",
            "@stylistic/indent": ["error", 2],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/comma-spacing': 'error',
            '@stylistic/function-call-argument-newline': ["error", "consistent"],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/type-annotation-spacing': "error",
            '@stylistic/object-curly-spacing': ["error", 'always'],
        },
    }
]

export default eslintConfig
