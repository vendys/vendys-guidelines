module.exports = {
  extends: [
    'eslint-config-airbnb',
    'react-app'
  ],
  plugins: [
    'import',
    'react'
  ],
  rules: {
    'react/jsx-no-bind': 0,
    'react/prop-types': 1,
    'react/prefer-stateless-function': [1, { 'ignorePureComponents': true}],
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [2, 2],
    'react/forbid-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react/sort-comp': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'arrow-body-style': [2, 'as-needed'],
    'comma-dangle': [2, { 'functions': 'never'}],
    'function-paren-newline': [0, 'always'],
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'no-mixed-spaces-and-tabs': 2,
    'no-undef': 0,
    'no-use-before-define': ['error', { 'functions': true, 'classes': true,  'variables': false  }],
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'object-curly-newline': 0,
    'no-console': 1,
    'one-var': 0,
    'no-unresolved': 0,
    'extensions': 0,
  }
};
