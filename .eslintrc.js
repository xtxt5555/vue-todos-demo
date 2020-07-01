module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser', // lint template标签中的语法
  parserOptions: {
    parser: 'babel-eslint', // lint JS语法
    soutMap: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  }
}
