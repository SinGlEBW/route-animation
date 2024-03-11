module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, es6: true },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',//убрать данное правило т.к. настраивать будем под себя
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-debugger": "off",
    "@typescript-eslint/no-explicit-any": "off",//будем местами использовать any в ts
    "@typescript-eslint/no-unused-vars": "off",//
    "no-unused-vars": "off",//убрать левые подчёркивания красным.
    /* Обязательно указывать const там где это действительно нужно */
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": true
    }],
    "@typescript-eslint/no-undef": "off",
    'no-undef': 'off',
  }

}
