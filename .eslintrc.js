module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'praoduction' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
      },
    ],
    'vue/require-default-prop': 0,
    'vue/name-property-casing': 0,
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multi-word-component-names': 'off',
  },
};
