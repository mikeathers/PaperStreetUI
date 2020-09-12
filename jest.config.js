module.exports = {
  timers: 'fake',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test/spec))\\.(ts|tsx)?$',
  moduleDirectories: ['node_modules', 'bower_components', 'src'],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/setup-tests.ts'],
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^containers(.*)$': '<rootDir>/containers$1',
    '^services(.*)$': '<rootDir>/services$1',
    '^__mocks__(.*)$': '<rootDir>/__mocks__$1',
    '^shared(.*)$': '<rootDir>/shared$1',
    '^api(.*)$': '<rootDir>/api$1',
    '^store(.*)$': '<rootDir>/store$1',
  },
  globals: {
    defaultAxiosResponse: {
      config: {},
      data: {},
      headers: {},
      status: 200,
      statusText: 'OK',
    },
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
    test: 'test',
  },
};
