import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptParser from "@typescript-eslint/parser";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": ["error"],
      "simple-import-sort/exports": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      // "import/first": "error",
      // "import/newline-after-import": "error",
      // "import/no-duplicates": "error",
    },
  }
);
