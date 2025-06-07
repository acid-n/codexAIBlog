module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": { tsconfig: "tsconfig.jest.json" },
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/styleMock.js",
  },
};
