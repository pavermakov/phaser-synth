var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');
var phaserCapture = path.join(__dirname, '/node_modules/phaser-capture/phaser-capture.js');

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			path.resolve(__dirname, 'src/main.js'),
		],
		vendor: ['pixi', 'p2', 'phaser', 'webfontloader'],
	},
	devtool: 'cheap-source-map',
	output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'scripts'),
    publicPath: './scripts/',
    filename: 'app.bundle.js',
  },
  watch: true,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),
		new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'template.html',
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build']
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /pixi\.js/,
         use: ['expose-loader?PIXI'],
      },
      {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser'],
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2'],
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'phaser-capture': phaserCapture,
    }
  }
}
