const config = require('./.cz-config.js')

const tags = config.types.map(type => type.value.substring(0, type.value.indexOf(' ')))

const codes = config.types.map(type => type.value.substring(type.value.indexOf(' ') + 1))

// generate an regex pattern for each a tag element, followed by a space, and a code element
const type = tags.map((tag, index) => `(${tag}\\s${codes[index]})`).join('|')

const pattern = `(?:(${type}))(?:\((?<scope>.*)\))?!?:\\s(?<subject>(?:(?!#).)*(?:(?!\\s).))\\s?(?<ticket>#\\d*)?`

const typeRegex = new RegExp(pattern)

module.exports = {
	parserPreset: {
		parserOpts: {
			headerPattern: typeRegex.source,
			headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
		},
	},
	extends: ['./node_modules/commitlint-config-cz', '@commitlint/parse'],
	rules: {
		'header-max-length': [0, 'always', 100],
		'type-empty': [2, 'never'],
	},
}
