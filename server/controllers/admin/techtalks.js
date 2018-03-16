var express = require('express');
var router = express.Router();
var TechTalks = require('../../models/TechTalks');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;
var EventModel = require('../../models/Event');

router.post('/addTopic', function (req, res, next) {
    console.log("India");
    var x = {"slug":req.body.slug , "name" : req.body.name};
    console.log(x);
  EventModel.find(x, function (err,data) {
      if(!err && data.length == 0){
        var event = new EventModel({
            'name' : req.body.name,
            'slug' : req.body.slug,
            'description' : req.body.description,
            'stages' : 0
        });
        event.save(function(error){
            console.log(error);
          if(error)
            console.trace(error);
          else {
              res.locals.responseObj = {
                 err: err,
                 msg: "Added event successfully"
              }
          }
          next();
        });
      }
      else{
          res.locals.responseObj = {
              err: "event already exist!!",
              msg: ""
          }
          next();
      }
  });
},responseHandler);

module.exports = router;