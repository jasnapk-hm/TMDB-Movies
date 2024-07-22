module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
      "**/__tests__/**/*.+(js|jsx)",
      "**/?(*.)+(spec|test).+(js|jsx)"
    ],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    coveragePathIgnorePatterns: [
      "/node_modules/"
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy"
    },
    bail: 1,
    verbose: true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
  };
  