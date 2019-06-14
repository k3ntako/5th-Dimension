var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
    extensions: [".js", ".json", ".css"]
  },
  module : {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
								localIdentName: "[name]--[local]--[hash:base64:8]"
							},
              sourceMap: true,
              importLoaders: 1,
            }
          },
        ]
      },
    ]
  },
  watchOptions: {
    ignored: /node_modules/
  },
	node: {
		fs: "empty"
	}
};

module.exports = config;
