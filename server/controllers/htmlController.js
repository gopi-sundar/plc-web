// const bodyParser = require('body-parser');
const { isAuthenticated } = require('../helpers/authHelper');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get('/', isAuthenticated, (req, res) => {
    console.log('PRINT\n 93 \n ', req.url);
    res.render('home', { title: 'Home' });
  });

  app.get('/home/home1', isAuthenticated, (req, res) => {
    res.render('home1', { title: 'Home 1' });
  });
};
