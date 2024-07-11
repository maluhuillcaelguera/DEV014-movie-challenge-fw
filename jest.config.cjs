module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  moduleNameMapper: {
    "^.+\\.css$": "<rootDir>/src/__mocks__/file-mock.cjs",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

  
  