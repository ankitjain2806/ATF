var express = require('express');
var router = express.Router();
var EventModel = require('../models/Event');
var User = require('../models/User');
var HCKinfoModel = require('../models/HCKinfo');
var request = require('request');

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
  var query = User.findById(req.params.userId).select({'events': 1}).populate({path : 'events.eventId', select: 'name'});
  query.exec(query, function (err, doc) {
    if(err) {
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
  var query = EventModel.findOne({slug: 'hackathon'}).select({'teams':1});
  query.exec(query, function (err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
    res.end();
  });

});

//api to display details of the selected team
router.get('/teams/HCK/showdetails/:teamId', function (req, res, next) {
  HCKinfoModel.findOne({"teamId":req.params.teamId}, function (err, doc) {
    if (err) {
      console.log(err);
    }
    res.json(doc);
    res.end();
  });
});



//api to approve/reject Hackathon team
router.put('/teams/HCK/approve', function (req, res, next) {

  HCKinfoModel.findOne({"teamId":req.body.teamId}, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      doc.isApproved = req.body.isApproved ;
      doc.save(function (err) {
        if (err) {
          res.send(err);
        }

        if(req.body.isApproved == true)
        {
        //Query to fetch gitids of the team members of this team
        HCKinfoModel.findOne({"teamId":req.body.teamId}, function (err, doc){
          if(err){console.log(err);}
          if(doc.isGitRepoCreated == false)
          {

            //Create git repos here and update it in hckinfos collection
              const gitUrl = "https://api.github.com/user/repos?access_token=";
              const access_token = "f656c6b6124bf2bc32050e6e857618452610c707";
              const gitData = {
                  "name": doc.teamName,
                  "description": "This is your first repository",
                  "homepage": "https://github.com",
                  "private": false,
                  "has_issues": true,
                  "has_projects": true,
                  "has_wiki": true
              };

              var options = {
                  uri: gitUrl+access_token,
                  method: 'POST',
                  headers: {
                      'User-Agent': 'request',
                      'content-type' : 'application/json'
                  },
                  json: gitData
              };

              request.post(options, function(error, response, body) {
                console.log(response.statusCode);
                if (!error && response.statusCode == 201) {
                      doc.isGitRepoCreated = true;
                      doc.gitRepoId = body.id;
                      doc.html_url = body.html_url;
                      doc.save(function (err) {
                          if(err)
                            console.log(err);
                      });
                  }
                  else
                    console.log("Error"+error);
              });
          }
          });
        }

        res.json({"message": "Updated Successfully"});
        res.end();
      });

    }
  });

});



module.exports = router;