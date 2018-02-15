var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require('../models/User');
var responseHandler = require('../util/responseHandler').Response;
var envConfig = require('../config/env');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: envConfig.googleAuth.clientID,
    clientSecret: envConfig.googleAuth.clientSecret,
    callbackURL: envConfig.siteUrl + envConfig.googleAuth.callbackUrl,
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    User.findOne({'email': profile.email}, function (err, person) {
      if (err) {
        return handleError(err);
      } else {
        if (person) {
          if(!person.isActive) {

          }

          request.session.user = person;
          return done(err, person);
        } else {
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

router.get('/google',
  passport.authenticate('google', {
      scope:
        [
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }
  ));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));


router.get('/getCurrentSession', function (req, res, next) {
  var sessionObj = {user: null};
  if (req.session && req.session.user) {
    sessionObj.user = {
      id: req.session.user._id,
      email: req.session.user.email,
      imageUrl: req.session.user.imageUrl,
      name: req.session.user.providerData.name
    }
  }
  res.locals.responseObj = sessionObj;
  next();
}, responseHandler);


router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
