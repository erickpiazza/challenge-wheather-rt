module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx,js,jsx}'],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
};
