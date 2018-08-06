const passport = require('passport');

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login', { title: 'Login ' });
  });

  app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );
};
