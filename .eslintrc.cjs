module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["solid"],
  extends: ["eslint:recommended", "plugin:solid/recommended"],

  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  globals: {
    suite: true,
    test: true,
    describe: true,
    it: true,
    expect: true,
    assert: true,
    vitest: true,
    vi: true,
    beforeAll: true,
    afterAll: true,
    beforeEach: true,
    afterEach: true,
  },
};
