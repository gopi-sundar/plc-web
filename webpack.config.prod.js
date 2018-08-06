const webpack = require('webpack');
const path = require('path');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const VENDOR_LIBS = ['jquery', 'knockout'];

const clientConfig = {
  name: 'client',
  target: 'web',
  entry: {
    homeBundle: ['./client/src/home/index.js'],
    inventoryBundle: ['./client/src/inventory/index.js'],
    warehouseBundle: ['./client/src/warehouse/index.js'],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, '.build/public'),
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
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc-prod.json',
              useEslintrc: false
            }
          }
        ]
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
    new CleanWebpackPlugin('.build'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client')
      }
    }),
    new UglifyJSPlugin()
  ]
};

const serverConfig = {
  entry: ['./server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      //   {
      //     test: /\.js?$/,
      //     exclude: /node_modules/,
      //     use: 'babel-loader'
      //   }
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc-prod.json',
              useEslintrc: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      //   'process.env': {
      //     BUILD_TARGET: JSON.stringify('server'),
      //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      //   }
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: './server/views',
        ignore: ['*Layout.hbs'],
        to: 'views'
      }
    ]),
    new HtmlWebpackPlugin({
      vendorFileName: '/vendor.js',
      homeBundleFileName: '/homeBundle.js',
      adminLteFileName: '/node_modules/admin-lte/dist/css/AdminLTE.css',
      filename: 'views/layouts/homeLayout.hbs',
      template: './server/views/layouts/homeLayout.hbs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      vendorFileName: '/vendor.js',
      inventoryBundleFileName: '/inventoryBundle.js',
      filename: 'views/layouts/inventoryLayout.hbs',
      template: './server/views/layouts/inventoryLayout.hbs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      vendorFileName: '/vendor.js',
      warehouseBundleFileName: '/warehouseBundle.js',
      filename: 'views/layouts/warehouseLayout.hbs',
      template: './server/views/layouts/warehouseLayout.hbs',
      chunks: []
    }),
    new MergeJsonWebpackPlugin({
      debug: true,
      files: ['./config/common.json', './config/production.json'],
      output: {
        fileName: 'config/config.json'
      }
    }),
    new UglifyJSPlugin()
  ]
};

module.exports = [clientConfig, serverConfig];
