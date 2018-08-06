const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?1000', './server/index.js'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  //externals: [nodeExternals()],
  //externals: nodeModules,
  //devtool: '#eval-source-map',
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('.build'),
    new StartServerPlugin('server.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './server/views',
        ignore: ['*Layout.hbs'],
        to: 'views'
      }
    ]),
    new HtmlWebpackPlugin({
      vendorFileName: 'http://localhost:3001/vendor.js',
      homeBundleFileName: 'http://localhost:3001/homeBundle.js',
      adminLteFileName: 'http://localhost:3001/node_modules/admin-lte/dist/css/AdminLTE.css',
      filename: 'views/layouts/homeLayout.hbs',
      template: './server/views/layouts/homeLayout.hbs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      vendorFileName: 'http://localhost:3001/vendor.js',
      inventoryBundleFileName: 'http://localhost:3001/inventoryBundle.js',
      filename: 'views/layouts/inventoryLayout.hbs',
      template: './server/views/layouts/inventoryLayout.hbs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      vendorFileName: 'http://localhost:3001/vendor.js',
      warehouseBundleFileName: 'http://localhost:3001/warehouseBundle.js',
      filename: 'views/layouts/warehouseLayout.hbs',
      template: './server/views/layouts/warehouseLayout.hbs',
      chunks: []
    }),
    new MergeJsonWebpackPlugin({
      debug: true,
      files: ['./config/common.json', './config/development.json'],
      output: {
        fileName: 'config/config.json'
      }
    })
  ]
};
