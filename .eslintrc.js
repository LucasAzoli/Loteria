module.exports = {
	root: true,
	extends: ['infojr-ts/next'],
	ignorePatterns: ['**/*.js'],
	// Option needed specially for monorepos where eslint doesn't know where to find tsconfig.json
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
	},
}
