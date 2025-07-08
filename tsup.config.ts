import { defineConfig } from 'tsup';

export default [
  defineConfig({
    entry: ['./src/main/index.ts'],
    format: ['esm'],
    splitting: false,
    clean: true,
    dts: true,
    outDir: 'dist',
  }),
  defineConfig({
    entry: ['./src/augmentations/index.ts'],
    splitting: false,
    format: ['esm'],
    clean: true,
    dts: true,
    outDir: 'dist/augmentations',
  }),
];
