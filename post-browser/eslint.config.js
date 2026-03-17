import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    // Ignore build and dependency folders
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Essential for TypeScript projects in ESLint 9+
      "no-undef": "off",
      "no-unused-vars": "off",
      // Handle the underscore prefix for unused variables
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "prettier/prettier": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // This turns off rules that conflict with Prettier
  eslintConfigPrettier,
];
