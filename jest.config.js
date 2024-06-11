export default {
  
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.json' }],
    },
    testMatch: [
      '**/__tests__/**/*.test.(js|jsx|ts|tsx)', 
      '**/?(*.)+(spec|test).(js|jsx|ts|tsx)'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/src/test/css/__mocks__/styleMock.js",
     },
  };
  
  