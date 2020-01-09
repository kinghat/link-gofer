const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: {
		background: "./src/background.js",
		"content-script": "./src/content-script.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ["!manifest.json"],
			verbose: true,
		}),
		new CopyWebpackPlugin([
			{
				from: "./src/manifest.json",
			},
		]),
		new ExtensionReloader(),
	],
};
