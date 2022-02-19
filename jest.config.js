module.exports = {
  roots: ["<rootDir>/src"],
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
    "<rootDir>/src/analysis/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/utils/*.{js,jsx,ts}",
    "<rootDir>/src/App.tsx",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/index.ts",
  ],
  coverageReporters: ["json", "lcov", "text", "cobertura"],
};