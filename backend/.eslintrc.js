module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:jest/recommended'],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module'
	},
	rules: {
		// ident
		
		'no-unused-vars': 'error',
		'no-undef': 'error',
		'no-unused-expressions': 'error',
		'no-unused-labels': 'error',
		'no-shadow': 'error',
		'no-shadow-restricted-names': 'error',
		'no-use-before-define': 'error',
		'no-useless-escape': 'error',
		'no-useless-return': 'error',
		'no-void': 'error',
		'no-with': 'error',
		'no-var': 'error',
		'no-restricted-globals': 'error',
		'no-restricted-imports': 'error',
		'no-restricted-modules': 'error',
		'no-restricted-properties': 'error',
		'no-restricted-syntax': 'error',
		'no-this-before-super': 'error',
		'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'never'
		]
	}
}