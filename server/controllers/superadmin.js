var express = require('express');
var router = express.Router();
var EventModel = require('../models/Event');
var User = require('../models/User');
var HCKInfoModel = require('../models/HCKinfo');
var request = require('request');
var responseHandler = require('../util/responseHandler').Response;
var envConfig = require('../config/env');

router.post('/events/addNewEvent', function (req, res, next) {

  if (req.body.name === null || req.body.name === undefined) {
    res.status(500).send({'error': 'cannot find the request body...'});
  }
  else {
    var event = new EventModel();
    event.name = req.body.name;
    event.description = req.body.description;
    event.memberCount = req.body.memberCount;
    event.slug = req.body.slug;
    event.stages = [];
    event.lastUpdated = null;
    event.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({"message": "Added Successfully"});
    });
  }
});

router.delete('/events/deleteEvent/:_id', function (req, res, next) {
  EventModel.findByIdAndRemove(req.params._id, function (err, data) {
    if (err)
      console.log(err);
    else {
      res.json({"message": "Deleted Successfully"});
      console.log(data);
    }
  });
});

router.put('/events/updateEvent/:_id', function (req, res, next) {
  EventModel.findById(req.params._id, function (err, event) {
    if (err)
      console.log(err);
    else {
      event.name = req.body.name || event.name;
      event.description = req.body.description || req.description;
      event.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({"message": "Updated Successfully"});
      });
    }
  });
});


//User Part

router.get('/users', function (req, res, next) {
  var query = User.find({});
  query.exec(query, function (err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
    res.end();
  });
});


router.get('/users/getEvents/:userId', function (req, res, next) {
  var query = User.findById(req.params.userId).select({'events': 1}).populate({path: 'events.eventId', select: 'name'});
  query.exec(query, function (err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
    res.end();
  });
});


router.put('/users/block', function (req, res, next) {
  // we expect 2 things from front  end
  //1 = User id - req.body.userId
  //2 = Event id - req.body.eventId
  User.findById(req.body.userId, function (err, user) {
    if (err)
      console.log(err);
    else {
      var eventArray = user.events;
      //loop through events to find matching event & set isBlocked as true for that event
      for (var i = 0; i < eventArray.length; i++) {
        if (eventArray[i].eventId === req.body.eventId) {
          eventArray[i].isBlocked = true;
          break;
        }
      }
      user.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({"message": "Blocked Successfully"});
        res.end();
      });
    }
  });
});

//api to list all the teams registered for HCK
router.get('/teams/getHCKteams', function (req, res, next) {
  var query = HCKInfoModel.find({});
  query.exec(query, function (err, doc) {
    res.locals.responseObj = {
      err: err,
      data: doc,
      msg: "hackathon teams"
    }
    next();
  });
}, responseHandler);

//api to display details of the selected team
router.get('/teams/HCK/showdetails/:teamId', function (req, res, next) {
  HCKInfoModel.findOne({"_id": req.params.teamId}, function (err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
    res.end();
  });
});


//api to approve/reject Hackathon team
router.put('/teams/HCK/approve', function (req, res, next) {
  HCKInfoModel.findById(req.body.teamId, function (err, team) {
    res.locals.responseObj = {
      err: err,
      data: team,
      msg: "hackathon teams"
    }
    next();

    if (!err) {
      team.isCheckedByAdmin = true;
      team.isApproved = team.isApproved;
      team.save(function (err, doc) {
        console.log("Error--------------",err);
        if (!err) {
          if (req.body.isApproved == true && doc.isGitRepoCreated == false) {
            //Create git repos here and update it in hckinfos collection
            const gitUrl = "https://api.github.com/user/repos?access_token=";
            const access_token = "61cc6ebe9ee642255961504429b5d0d176786d32";
            const gitData = {
              "name": doc.teamName,
              "description": "This is your first repository",
              "homepage": "https://github.com",
              "private": false,
              "has_issues": true,
              "has_projects": true,
              "has_wiki": true
            };
            console.log(envConfig)
            var options = {
              uri: gitUrl + access_token,
              method: 'POST',
              headers: {
                'User-Agent': 'request',
                'content-type': 'application/json'
              },
              json: gitData
            };

            request(options, function (error, response, body) {
              console.log("Document..................", error, body);
              if (!error && response.statusCode == 201) {
                doc.isGitRepoCreated = true;
                doc.gitRepoId = body.id;
                doc.gitRepo = body.html_url;
                doc.save(function (err) {
                  if (err)
                    console.log(err);
                  else {
                    for (var i = 0; i < doc.members.length; i++) {
                      var option = {
                        uri: "https://api.github.com/repos/divyanshu-18/" + doc.teamName + "/collaborators/" + doc.members[i].gitId + "?access_token=" + access_token,
                        method: 'PUT',
                        headers: {
                          'User-Agent': 'request',
                          'content': 'application/json'
                        },
                        json: {
                          "permission": "pull,push"
                        }
                      };
                      console.log("Option -------- ", option);
                      request(option, function (error, response, body) {
                        console.log(body)
                      });
                    }
                  }
                });
              }

            });
          }
        }
      });
    }
  });
}, responseHandler);

module.exports = router;