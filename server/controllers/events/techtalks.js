var express = require('express');
var router = express.Router();
var TechTalks = require('../../models/TechTalks');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;

router.get('/getAllTopics', function (req, res, next) {
  console.log("---------------------------------------")
  async.parallel({
    myTopics: function(callback) {
      callback(null, []);
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
module.exports = router;