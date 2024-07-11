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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file-Mock.cjs',
  },
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

  
  