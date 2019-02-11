module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    // '@vue/unibeautify'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": ['error', 'single'],
    'indent': ['error', 2],
    'linebreak-style': [
      "error", 'unix'
    ],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      "multiline": 'never'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      "selfClosingTag": 'always'
    }],
    // 'prettier/prettier': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
