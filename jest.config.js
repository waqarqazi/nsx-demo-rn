module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@tanstack|@reduxjs|react-redux|immer)/)',
  ],
  moduleNameMapper: {
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@api/(.*)$': '<rootDir>/src/shared/api/$1',
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@theme/(.*)$': '<rootDir>/src/shared/theme/$1',
    '^@types/(.*)$': '<rootDir>/src/shared/types/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 5,
      lines: 25,
      statements: 25,
    },
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
