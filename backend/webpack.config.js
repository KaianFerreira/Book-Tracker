const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	mode: 'production',
	target: 'node',
	plugins:[ new ESLintPlugin() ],
	entry: {
		app: ['./src/server.js']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js'
	},
	externals: [nodeExternals()],
}
