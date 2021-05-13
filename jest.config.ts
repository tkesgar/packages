import type { Config } from "@jest/types";

export default <Config.InitialOptions>{
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
};
