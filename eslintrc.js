module.exports = {
    parser: '@babel/eslint-parser', // or 'babel-eslint' if not using @babel/eslint-parser
    parserOptions: {
      ecmaVersion: 2023, // or later
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
      // Additional rules or overrides as needed
    },
  };
  