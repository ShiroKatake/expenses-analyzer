module.exports = {
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setuptests.ts"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js"
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/coverage/",
    "<rootDir>/build/",
    "<rootDir>/public/",
  ],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/cssTransform.js'
  },
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/utils/*.{js,jsx,ts}",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/index.ts",
  ],
  coverageReporters: ["json", "lcov", "text", "cobertura"],
};