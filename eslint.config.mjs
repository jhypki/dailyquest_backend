import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
        languageOptions: { globals: globals.browser },
        rules: { '@typescript-eslint/no-unused-vars': ['warn', { caughtErrors: 'none' }] }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    { ignores: ['**/node_modules/**', '**/dist/**', '**/*.test.*'] }
];
