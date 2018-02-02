var express = require('express');
var router = express.Router();
// var passport = require('passport');

// var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require('../models/User');
// var envConfig = require('../config/env');

/*
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
*/

/*
passport.use(new GoogleStrategy({
    clientID: envConfig.googleAuth.clientID,
    clientSecret: envConfig.googleAuth.clientSecret,
    callbackURL: envConfig.siteUrl + "/api/users/auth/google/callback",
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    User.findOne({'email': profile.email}, function (err, person) {
      if (err) {
        return handleError(err);
      } else {
        if (person) {
          request.session.user = person;
          return done(err, person);
        } else {
          console.log(profile);
          var user = new User({
            name: {
              familyName: profile.name.familyName,
              givenName: profile.name.givenName
            },
            isActive: true,
            email: profile.email,
            imageUrl: profile.photos[0].value,
            provider: profile.provier,
            providerData: profile._json
          });
          user.save(function (err, data) {
            request.session.user = data;
            return done(err, data);
          })
        }
      }
    });
  }
));

*/
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*router.get('/auth/google',
  passport.authenticate('google', {
      scope:
        [
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }
  ));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));*/

/*router.get('/getCurrentSession', function (req, res, next) {
  var sessionObj = {user: null};
  if (req.session && req.session.user) {
    sessionObj.user = req.session.user;
  }
  res.json(sessionObj)
});*/

router.get('/events/all', function (req, res, next) {
  res.json({'name': 'name', 'description': 'description'});
  res.end();
});

/*router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});*/

module.exports = router;