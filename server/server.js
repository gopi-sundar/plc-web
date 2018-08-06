const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const hbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const apiController = require('./controllers/apiController');
const authController = require('./controllers/authController');
const authHelper = require('./helpers/authHelper');
const htmlController = require('./controllers/htmlController');

// Create a new Express application
const app = express();

// Configure view engine to render Handlebar templates
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

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(
  session({
    secret: crypto.randomBytes(16).toString('hex'),
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// called after successful authentication
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// called on subsequent requests to get user from session cookie.
passport.deserializeUser((id, cb) => {
  authHelper.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

passport.use(
  // Verify callback- accepts username and password
  // (which are submitted to the application via a login form.)
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, cb) => {
      authHelper.findByUsername(username, (err, user) => {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false);
        }
        if (user.password !== password) {
          return cb(null, false);
        }
        return cb(null, user);
      });
    }
  )
);

authController(app);
htmlController(app);
apiController(app);

if (process.env.NODE_ENV !== 'production') {
  // running in the development mode
  console.log('non-production');
} else {
  // if the environment is production buiding the code in production mode
  console.log('production');
  app.use(express.static('.build/public'));
}

module.exports = app;
