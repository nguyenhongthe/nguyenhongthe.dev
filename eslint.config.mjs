import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    recommendedTsConfig: ts.configs.recommended,
    recommendedPrettierConfig: prettierConfigRecommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        ".next/*",
        "postcss.config.js",
        "postcss.config.js",
        "next.config.js",
        "next.config.ts",
        "next-env.d.ts",
        "withTwin.js",
        "tailwind.config.js",
        "tailwind.config.ts",
        "src/theme/dark",
        "src/theme/light",
        ".eslintrc.cjs",
        "node_modules",
        "src/components/ui",
        "setupTests.ts",
    ],
}, ...compat.extends("next/core-web-vitals"), ...fixupConfigRules(compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
)).map(config => ({
    ...config,
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
})), {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

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
    },
}];
