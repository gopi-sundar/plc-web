const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

const apiController = require('./controllers/apiController');
const htmlController = require('./controllers/htmlController');

//app.use('/assets', express.static('../dist'));
//app.use(express.static('dist'));

app.set('views', '.build/views');
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'homeLayout',
    layoutsDir: '.build/views/layouts/'
  })
);
app.set('view engine', 'hbs');

htmlController(app);
apiController(app);

if (process.env.NODE_ENV !== 'production') {
  // running in the development mode
  console.log('non-production');
  // const webpack = require('webpack');
  // const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');
  // const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  // const webpackConfig = require('../webpack.config.client.js');
  // const compiler = webpack(webpackConfig);

  // app.use(
  //   webpackDevMiddleware(compiler, {
  //     serverSideRender: true
  //   })
  // );
  //app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
  //app.use(webpackHotServerMiddleware(compiler));

  // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
  //app.use(webpackHotMiddleware(compiler));
  //app.use(webpackHotServerMiddleware(compiler));
  // app.use(require("webpack-hot-middleware")(compiler.compilers.find(compiler => compiler.name === 'client'), {
  //   log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  // }));
} else {
  // if the environment is production buiding the code in production mode
  console.log('production');
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

//app.listen(process.env.PORT || 3000);
module.exports = app;
