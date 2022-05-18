module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: 'standard-with-typescript',
    parserOptions: {
        ecmaVersion: 11,
        project: './tsconfig.json',
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-var-requires': [0],
        '@typescript-eslint/strict-boolean-expressions': [0],
        '@typescript-eslint/restrict-template-expressions': [0],
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
        'no-void': [0],
        'import/order': ['error', {
            'newlines-between': 'always-and-inside-groups',
        }],
    },
}
