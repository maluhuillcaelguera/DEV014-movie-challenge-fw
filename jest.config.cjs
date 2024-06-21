module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  moduleNameMapper: {
    "^.+\\.css$": "<rootDir>/src/__mocks__/file-mock.cjs",
  },
};

  
  