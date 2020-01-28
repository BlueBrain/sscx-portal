module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx|html)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
