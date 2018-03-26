var express = require('express');
var router = express.Router();
var TechTalks = require('../../models/TechTalks');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;
var EventModel = require('../../models/Event');

router.post('/addTopic', function (req, res, next) {
  var query = {$or: [{slug: req.body.slug}, {topic: req.body.topic}]};
  TechTalks.find(query, function (err, data) {
    if (!err && data.length == 0) {
      var topic = new TechTalks({
        'topic': req.body.topic,
        'slug': req.body.slug,
        'description': req.body.description,
        'seats': req.body.seats,
      });
      topic.save(function (err, data) {
        res.locals.responseObj = {
          err: err,
          data: data,
          msg: "Add Topic"
        }
        next();
      });
    } else {
      res.locals.responseObj = {
        err: null,
        data: null,
        msg: "topic already exist!!"
      }
      next();
    }
  });
}, responseHandler);

module.exports = router;