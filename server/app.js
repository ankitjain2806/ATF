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
var compilerController = require('./controllers/events/compiler');
var treasureHuntController = require('./controllers/events/treasurehunt');
var superAdminController = require('./controllers/superadmin');
var AuthController = require('./controllers/auth');
var HCKController = require('./controllers/events/HCK');
var TechTalksController = require('./controllers/events/techtalks');
var TechTalksAdminController = require('./controllers/admin/techtalks');

var isLoggedIn = require('./util/middlewares').isLoggedIn;
var isAdmin = require('./util/middlewares').isAdmin;
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var socket = require('./util/socket');
socket.setSocket(io);

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
/*var isLoggedIn = function (req, res, next) {
  if (req.session && typeof req.session.user !== 'undefined') {
    next();
  } else {
    res.sendStatus(401);
    res.end();
  }
};

var isAdmin = function (req, res, next) {
  if (req.session && typeof req.session.user !== 'undefined' && req.session.user.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
    res.end();
  }
};*/


app.use('/api/users', isLoggedIn, usersController);
app.use('/api/events', eventsController);
app.use('/api/compiler', isLoggedIn, compilerController);
app.use('/api/treasurehunt', isLoggedIn, treasureHuntController);
app.use('/api/HCK', isLoggedIn, HCKController);
app.use('/api/techtalks', TechTalksController);

/*-----------------------------------------------------------------*/
app.use('/api/superadmin/techtalks', isAdmin, TechTalksAdminController);
app.use('/api/superadmin', isAdmin, superAdminController);
/*-----------------------------------------------------------------*/

app.use('/api/auth', AuthController);

// /api/users/getAll
// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});


// rewrite virtual urls to angular app to enable refreshing of internal pages
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.error(err)
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

module.exports = {app: app, server: server};