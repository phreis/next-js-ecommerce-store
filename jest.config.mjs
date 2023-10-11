import nextJest from 'next/jest.js';

// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/playwright/'],
  moduleNameMapper: {
    // 🧑🏻‍🔧 FIX Problem here
    // 🧑🏻‍🔧 resolve react module with the next.js inset one.
    react: 'next/dist/compiled/react/cjs/react.development.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
