module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/no-unstable-nested-components': ['off', {allowAsProps: false}],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
