module.exports = {
  testEnvironment: 'enzyme',
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.scss$': '<rootDir>/__mocks__/style.mock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/components/Avatar.test.js',
    '<rootDir>/__tests__/_.*',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
}
