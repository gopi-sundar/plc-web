// const bodyParser = require('body-parser');
const inventoryController = require('./inventoryController');
const warehouseController = require('./warehouseController');
const { isAuthenticated } = require('../helpers/authHelper');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  inventoryController(app);
  warehouseController(app);

  app.get('/', isAuthenticated, (req, res) => {
    console.log('PRINT\n 93 \n ', req.url);
    res.render('home', { title: 'Home' });
  });

  app.get('/home/home1', isAuthenticated, (req, res) => {
    res.render('home1', { title: 'Home 1' });
  });
};
