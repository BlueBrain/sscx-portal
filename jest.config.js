module.exports = {
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
