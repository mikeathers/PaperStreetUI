module.exports = {
  timers: "fake",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/*.(ts|tsx)"],
  moduleDirectories: ["node_modules", "bower_components", "src"],
  setupFilesAfterEnv: ["<rootDir>/__mocks__/setupTests.ts"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/components$1",
    "^containers(.*)$": "<rootDir>/containers$1",
    "^services(.*)$": "<rootDir>/services$1",
    "^api(.*)$": "<rootDir>/api$1",
    "^store(.*)$": "<rootDir>/store$1",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
};
