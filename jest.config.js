module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      },
    ],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^styled-system/jsx$': '<rootDir>/test/__mocks__/styled-system-jsx.ts',
    '^styled-system/css$': '<rootDir>/test/__mocks__/styled-system-css.ts',
  },
  setupFiles: ['./jest.setup.js'],
}
