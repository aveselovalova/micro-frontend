const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
	template: "./src/index.html",
});

const moduleFederationPlugin = new ModuleFederationPlugin({
	name: "moduleApp",
	library: { type: "var", name: "moduleApp" },
	filename: "remoteEntry.js",
	exposes: {
		"./App": "./src/components/App/App",
	},
	shared: ["react", "react-dom"],
});

module.exports = {
	entry: "./src/index",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8081,
	},
	output: {
		publicPath: "http://localhost:8081/",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				// to avoid: Uncaught Error: Shared module is not available for eager consumption
				test: /bootstrap\.tsx$/,
				loader: "bundle-loader",
				options: {
					lazy: true,
				},
			},
			{
				test: /\.(t|j)sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader'
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]__[local]___[hash:base64:5]'
							},
						}
					}
				]
			},
		],
	},
	plugins: [moduleFederationPlugin, htmlPlugin],
};
