export default {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!index.js'
  ],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
};
