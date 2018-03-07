var express = require('express');
var EventModel = require('../models/Event');
var User = require('../models/User');
var Resource = require('../models/CompilerResource');
var UserEventStateModel = require('../models/UserEventState');
var router = express.Router();
var async = require('async');
var eventService = require('../service/events.service');
var HCKinfoModel = require('../models/HCKinfo');

router.get('/getEventDetails/:slug', function (req, res, next) {
  var loggedInUser = req.session.user;
  async.waterfall([
    function (callback) {
      var query = {
        slug: req.params.slug,
      };
      EventModel.findOne(query, function (err, event) {
        callback(null, event);
      });
    },
    function (event, callback) {
      console.log(event)
      var query = {
        'events.eventId': {"$in": [event._id]},
        _id: req.session.user._id
      };
      User.findOne(query, function (err, user) {
        var eventDetails = {
          name: event.name,
          description: event.description,
          slug: event.slug,
          memberCount: event.memberCount,
          isMember: (user) ? true : false
        }
        callback(null, eventDetails);
      });
    }
  ], function (err, result) {
    res.json(result);
  });


});

router.get('/all', function (req, res, next) {
  var query = EventModel.find().select('name description slug');
  query.exec(function (err, data) {
    res.json(data);
    res.end();
  });
});

router.post('/team-register', function (req, res, next) {
  var eventId = null;
  var teamData = {
    teamName: req.body.teamName,
    members: []
  };

    async.series([
            function (callback) {
                var users = req.body.members;
                async.times(users.length, function (n, next) {
                    User.findOne({email: users[n].email}, function (err, person) {
                        if(err)
                            console.log("Error in find User -----------",err);
                        console.log("Person-----------",person);

                        if (err) {
                            callback(err, null)
                        }
                        if (person) {
                            next(null, person.id)
                        } else {
                            var user = new User({
                                name: {
                                    familyName: "",
                                    givenName: ""
                                },
                                isActive: false,
                                email: users[n].email,
                                imageUrl: "",
                                provider: "",
                                isInvited: true,
                                providerData: ""
                            });
                            user.save(function (err, data) {
                                if(err)
                                    console.log("Error in save User -----------",err);
                                else
                                    console.log("No error--------",data)
                                next(null, data._id)
                            })
                        }
                    });
                }, function (err, members) {
                    members.push(req.session.user._id)
                    teamData.members = members;
                    callback(null, members);
                });
            },
            function (callback) {
                EventModel.findOne({slug: req.body.slug}, function (err, event) {
                    eventId = event._id;
                    event.teams.push(teamData);
                    event.save(function (err, data) {
                        console.log(data.teams.length);
                        var _teamId ;
                        for(var i=0; i<data.teams.length; i++){
                            if(data.teams[i].teamName === req.body.teamName)
                                _teamId = data.teams[i]._id;
                        }

                        var _members = [];
                        _members= req.body.members;
                        _members.push({'email':req.session.user.email, 'gitId':req.body.userGitId})
                        console.log("Email ------------------------------------",_members);
                        var HCKData = new HCKinfoModel({
                            teamId: _teamId,
                            members: _members,
                            idea: req.body.idea,
                            resources: req.body.resources,
                            isApproved: false,
                            teamName: req.body.teamName,
                            gitRepoId : "",
                            gitRepo : "",
                        });

                        HCKData.save(function (err) {
                            if(err)
                                console.log("Error in HCKInfo    ----------------",err);
                        });
                        callback(err, event)
                    });
                });
            },
            function (callback) {
                console.log("team data------------------",teamData);
                async.times(teamData.members.length, function (n, next) {
                    User.findOne({_id: teamData.members[n]}, function (err, user) {
                        console.log(err);
                        if (err) {
                            next(err, null)
                        }
                        if (!user.events) {
                            user.events = [];
                        }
                        user.events.push({eventId : eventId, isBlocked: false});
                        user.save(function (err, data) {
                            next(null, data)
                        })
                    });
                }, function (err, members) {
                    res.json({data: 'success'})
                });
            },
        ]
    );
});

router.post('/end', function (req, res) {

  /**
   * event points, stage wise points, other events
   * */
  const event = req.body.slug;
  const recommendationsQuery = EventModel.find({}).select({'title': 1, 'description': 1, '_id': 0});
  async.series({
    recommendations: function (callback) {
      recommendationsQuery.exec(function (err, rDoc) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rDoc);
        }
      });
    }
  }, function (err, results) {
    if (err) {
      res.json({error: 'can not get the data', data: err});
      res.end();
    } else {
      res.json(results);
      res.end();
    }
  });
});

router.post('/isended', function (req, res) {
  const event = req.body.slug;
  const user = req.body.user;
  console.log(event, user);
  const query = UserEventStateModel.find(
    {
      'user': user,
      'events.slug': event
    }
  );
  query.exec(function (err, rDoc) {
    if (err) {
      res.json({error: 'cannot get the data', data: false});
      res.end();
    } else {
      const _events = rDoc[0].toObject().events;
      const _event = _events.filter(e => e.slug === event);
      console.log(_event);
      res.json({data: _event[0].completed});
      res.end();
    }
  });
});

module.exports = router;
