export default {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js'
  ],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
};
