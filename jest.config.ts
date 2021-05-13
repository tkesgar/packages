import type { Config } from "@jest/types";

export default <Config.InitialOptions>{
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
  moduleNameMapper: {
    // TODO This is a hack to remove the `.js` extension from import.
    // In the future, we might want to move away to use `ts-node` or something.
    "^(\\..*)\\.js$": "$1",
  },
};
