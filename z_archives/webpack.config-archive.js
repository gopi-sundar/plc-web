const webpack = require('webpack');
const path = require('path');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

//const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const VENDOR_LIBS = ['lodash'];

// const nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

module.exports =
  // {
  //   name: 'server',
  //   entry: [
  //     'webpack/hot/poll?1000',
  //     './server/server2.js'
  //   ],
  //   //watch: true,
  //   target: 'node',
  //   externals: [nodeExternals({
  //     whitelist: ['webpack/hot/poll?1000']
  //   })],
  //   //externals: [nodeExternals()],
  //   //externals: nodeModules,
  //   devtool: '#eval-source-map',
  //   output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: 'server.js'
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js?$/,
  //         exclude: /node_modules/,
  //         use: 'babel-loader'
  //       }
  //     ]
  //   },
  //   plugins: [
  //     //new StartServerPlugin('server.js'),
  //     //new webpack.HotModuleReplacementPlugin(),
  //     //new webpack.NamedModulesPlugin(),
  //     new webpack.NoEmitOnErrorsPlugin(),
  //     new webpack.DefinePlugin({
  //       "process.env": {
  //         "BUILD_TARGET": JSON.stringify('server')
  //       }
  //     }),
  //     new CopyWebpackPlugin([{
  //       from: './server/views',
  //       to: 'views'
  //     }]
  //     )
  //   ]
  // },
  {
    name: 'client',
    //mode: 'development',
    target: 'web',
    devtool: '#source-map',
    entry: {
      //bundle: ['./client/src/client.js', 'webpack-hot-middleware/client'],
      homeBundle: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/src/home/index.js'
      ],
      inventoryBundle: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/src/inventory/index.js'
      ],
      warehouseBundle: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/src/warehouse/index.js'
      ],
      vendor: VENDOR_LIBS
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
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
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: "style-loader",
        //     use: "css-loader"
        //   })
        // },
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
        // { // USE IN PROD
        //   test: /\.(s*)css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: [
        //       'css-loader',
        //       'sass-loader'
        //     ]
        //   })
        // }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist'),
      new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
      }),
      // new HtmlWebpackPlugin({
      //   template: './server/views/layouts/main.hbs',
      //   filename: 'main.hbs'
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.HotModuleReplacementPlugin()

      // new BrowserSyncPlugin(
      //   // BrowserSync options
      //   {
      //     // browse to http://localhost:3000/ during development
      //     host: 'localhost',
      //     port: 3000,
      //     // proxy the Webpack Dev Server endpoint
      //     // (which should be serving on http://localhost:3100/)
      //     // through BrowserSync
      //     proxy: 'http://localhost:3100/'
      //   },
      //   // plugin options
      //   {
      //     // prevent BrowserSync from reloading the page
      //     // and let Webpack Dev Server take care of this
      //     reload: true
      //   }
      // )
    ]

    // WEBPACK 4 code
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
    //     }
    //   }
    // }
  };
