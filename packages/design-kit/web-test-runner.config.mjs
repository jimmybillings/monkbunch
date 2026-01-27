import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  rootDir: '.',
  files: 'dist/**/*.spec.js',
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
  ],
  coverageConfig: {
    threshold: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
};
