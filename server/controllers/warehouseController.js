const { isAuthenticated } = require('../helpers/authHelper');
// const bodyParser = require('body-parser');

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  // HTML routes - Begin
  app.get('/warehouse', isAuthenticated, (req, res) => {
    res.render('warehouse', {
      title: 'Warehouse Management',
      layout: 'warehouseLayout',
      condition: true,
      anyArray: [1, 2, 3]
    });
  });

  // HTML routes - End

  // API routes - Begin
  // All API routes  that return json data go here
  // API routes - End
};
