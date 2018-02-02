var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var envConfig = require('./config/env');

var cors = require('cors');


var index = require('./controllers/index');
var usersController = require('./controllers/users');
var eventsController = require('./controllers/events');
var AuthController = require('./controllers/auth')


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(require('express-session')({
  secret: envConfig.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: envConfig.mongoURI
    // mongoOptions: advancedOptions // See below for details
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

/**
 * middleware for check loggedin user
 * @param req
 * @param res
 * @param next
 */
var isLoggedIn = function (req, res, next) {
  if (req.session && typeof req.session.user !== undefined) {
    next();
  } else {
    res.redirect('/');
  }
};

app.use('/api/users', isLoggedIn, usersController);
app.use('/api/events', isLoggedIn, eventsController);
app.use('/auth', AuthController)

// /api/users/getAll
// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});


// rewrite virtual urls to angular app to enable refreshing of internal pages
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(err)
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'error': err});
});

module.exports = app;
