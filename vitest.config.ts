/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      all: true,
      include: ['src/**/*.ts'],
    },
  },
});
