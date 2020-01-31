module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx|html)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '\\.svg$': '<rootDir>/src/__mocks__/svgrMock.tsx',
  },
};
