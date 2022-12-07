module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@next/next/no-img-element': 'off',
    'import/no-anonymous-default-export': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    'react/display-name': 'off',
  },
};
