'use strict';

const path    = require('path'),
      webpack = require('webpack')

module.exports = {
	entry: ['./app/scripts/app.js'],
	output: {
		path: path.join(__dirname, './electron'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js']
	}
}
