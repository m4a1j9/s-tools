const { pathsToModuleNameMapper } = require('ts-jest');
const fs = require('fs');
const path = require('path');

// Получаем путь к tsconfig.json
const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      diagnostics: false,
    }]
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
};