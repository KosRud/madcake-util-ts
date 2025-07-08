import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import type { TSESLint } from '@typescript-eslint/utils';

const configArray: TSESLint.FlatConfig.ConfigArray = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
);

export default configArray;
