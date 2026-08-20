import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/layout.js',
    '!src/app/globals.css',
  ],
  moduleNameMapper: {
    '^swiper/css.*$': '<rootDir>/__mocks__/styleMock.js',
    '^swiper/react$': '<rootDir>/__mocks__/swiperReactMock.js',
    '^swiper/modules$': '<rootDir>/__mocks__/swiperModulesMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
