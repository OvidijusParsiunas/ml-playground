module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json'],
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'max-len': ['error', { code: 123 }],
    'prefer-template': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    'linebreak-style': 0,
    'no-bitwise': ['error', { allow: ['<<', '|'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
