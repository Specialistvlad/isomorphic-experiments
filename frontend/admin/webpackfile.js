const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

var cssName = isProduction ? 'styles-[hash].css' : 'styles.css';
var jsName = isProduction ? 'bundle-[hash].js' : 'bundle.js';

const pluginsProd = [
	new webpack.optimize.UglifyJsPlugin(),
	new webpack.optimize.AggressiveMergingPlugin(),
];

const pluginsDev = [
	new webpack.HotModuleReplacementPlugin(),
];

const plugins = [
	new ExtractTextPlugin(cssName),
];

module.exports = [{
	target: 'web',
	entry: __dirname,
	output: {
		filename: jsName,
		path: path.resolve(__dirname, 'build'),
	},
	plugins: isProduction ? plugins.concat(pluginsProd) : plugins.concat(pluginsDev),
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				query: {
					presets: ['stage-0', 'latest', 'react']
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader?sourceMap",
				}),
			},
			{
				test: /\.scss$/,
				loaders: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: "css-loader?sourceMap!sass-loader?sourceMap",
				}),
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000' }
		],
	},
	devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
	devServer: {
		inline: true,
		hot: true,
		compress: true,
		contentBase: path.resolve(__dirname, 'static'),
		historyApiFallback: true,
		proxy: {
			'/admin-api': {
				target: 'http://localhost:33333',
				pathRewrite: {'^/admin-api' : ''}
			}
		}
	}
}];
