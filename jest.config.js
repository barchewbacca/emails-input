module.exports = {
  testRegex: "./src/.*.test.ts$",
  preset: 'ts-jest',
  transform: {
    "^.+\\.(tsx?)$": "babel-jest",
  },
}