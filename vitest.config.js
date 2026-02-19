import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: -30,
      },
      include: ['**/*.{js,jsx}'],
      exclude: [
        '**/node_modules/**',
        '**/coverage/**',
        'vitest.config.js',
        'index.js'
      ],
    },
    setupFiles: ['./.vitest/setEnvVars.js'],
    globals: false
  },
});
