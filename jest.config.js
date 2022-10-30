/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'html', 'text'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/services',
        'src/middlewares',
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
    testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
    //setupFiles: ['<rootDir>/__mocks__/setup.ts'],
    globalTeardown: '<rootDir>/test-teardown-globals.js',
};
