var express = require('express');
var router = express.Router();
var TechTalks = require('../../models/TechTalks');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;
var isLoggedIn = require('../../util/middlewares').isLoggedIn;
var _ = require('lodash');
router.get('/getAllTopics', function (req, res, next) {
  async.parallel({
    myTopics: function(callback) {
      if(req.session && req.session.user) {
        User.findById(req.session.user._id).select('techTalks').exec(function (err, data) {
          callback(err, data);
        })
      } else {
        callback(null, []);
      }
    },
    allTopics: function(callback) {
      TechTalks.find({isActive : true}).select('topic description').exec(function (err, data) {
        callback(err, data);
      });
    }
  }, function(err, results) {
    res.locals.responseObj = {
      err: err,
      data: results,
      msg: 'All techtalk topics'
    }
    next();
  });
}, responseHandler);

router.put('/subscribe', isLoggedIn, function (req, res, next) {
  var query = {
    id: req.session.user._id,
    'techTalks.topicId': req.body.topicId
  };

  User.findById(req.session.user._id).exec(function (err, user) {
    if(!err && user) {
      async.series({
        calculation: function (callback) {
          if(typeof user.techTalks == 'undefined' || user.techTalks == null) {
            user.techTalks = [];
          }
          var index = _.findIndex(user.techTalks, function(o) { return o.topicId == req.body.topicId; });

          if(req.body.subscribeTopic && index < 0) {
            user.techTalks.push({
              topicId: req.body.topicId,
              isBlocked: false,
              registeredOn: new Date()
            });
          }

          if(!req.body.subscribeTopic && index >= 0) {
            user.techTalks.splice(index, 1)
          }
          callback();
        },
        techTalk: function(callback) {
          TechTalks.findById(req.body.topicId).select('users').exec(function (err, data) {
            callback(err, data)
          })
        },
        user: function(callback) {
          user.save(function (err, data) {
            callback(err, data)
          })
        }
      }, function(err, results) {
        if(!err) {
          var userIndex = _.findIndex(results.techTalk.users, function(o) { return o.userId == req.session.user._id; });
          if(req.body.subscribeTopic && userIndex < 0) {
            results.techTalk.users.push({
              userId: req.session.user._id,
              isBlocked: false
            });
          }
          
          if(!req.body.subscribeTopic && userIndex >= 0) {
            results.techTalk.users.splice(userIndex, 1)
          }

          results.techTalk.save(function (err, data) {
          })
        }
        res.locals.responseObj = {
          err: err,
          data: results.user.techTalks,
          msg: 'topic subscribed'
        }
        next();
      });
    } else {
      res.locals.responseObj = {
        err: err,
        data: [],
        msg: 'something went wrong'
      }
      next();
    }
  })
}, responseHandler)
module.exports = router;