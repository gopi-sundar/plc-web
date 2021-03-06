const webpack = require('webpack');
const path = require('path');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const VENDOR_LIBS = ['jquery', 'knockout'];

module.exports = {
  name: 'client',
  target: 'web',
  devtool: '#source-map',
  entry: {
    homeBundle: [
      //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server',
      './client/src/index.js'
    ],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, '.dist'),
    publicPath: 'http://localhost:3001/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'style-loader',
            options: { hmr: true }
          },
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('.dist'),
    // new ExtractTextPlugin({
    //   filename: 'styles.css',
    //   allChunks: true
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'views/layouts/homeLayout.hbs',
    //   template: 'server/views/layouts/homeLayout.hbs',
    //   chunks: ['vendor', 'homeBundle']
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client')
      }
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true
  }
};
