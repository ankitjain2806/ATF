var express = require('express');
var EventModel = require('../models/Event');
var TeamModel = require('../models/Team');
var User = require('../models/User');
var Resource = require('../models/Resource');
var UserEventStateModel = require('../models/UserEventState');
var router = express.Router();
var async = require('async');
var eventService = require('../service/events.service');

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
          isMember: (user) ? true : false
        }
        callback(null, eventDetails);
      });
    }
  ], function (err, result) {
    res.json(result);
  });


});

router.get('/resources/:slug', function (req, res, next) {
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
      var query = {
        eventId: event._id
      };
      var query = Resource.find(query).select('name');
      query.exec(function (err, resources) {
        res.json({resources : resources});
      });
    }
  ]);

});

router.post('/addResource', function (req, res, next) {
  var resourceObj = {
    name: req.body.name,
    body: req.body.body,
    testCases: req.body.testCases,
    eventId: req.body.eventId,
    isActive: req.body.isActive,
  }
  var resource = new Resource(resourceObj);
  resource.save(function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json({msg : 'Resource Saved'})
    }
  })
});

router.get('/getResource/:id', function (req, res, next) {
  var query = Resource.findById(req.params.id).select('name body eventId');
  query.exec(query, function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data)
    }
  })
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
    captain: req.session.user._id,
    members: []
  };

  async.series([
      function (callback) {
        var users = req.body.members;
        async.times(users.length, function (n, next) {
          User.findOne({email: users[n].email}, function (err, person) {
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
                next(null, data.id)
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
          eventId = event.id;
          event.teams.push(teamData);
          event.save(function (err, data) {
            callback(err, event)
          })
        });
      },
      function (callback) {
        async.times(teamData.members.length, function (n, next) {
          User.findOne({_id: teamData.members[n]}, function (err, user) {
            console.log(err, user)
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


/**
 * @todo move to events/treasurehunt
 */
router.get('/treasurehunt/details', function (req, res, next) {
  const query = EventModel.findOne({'name': 'TreasureHunt'})
    .select({'title': 1, 'description': 1});
  query.exec(function (err, data) {
    res.json({data: data});
    res.end();
  });
});

router.post('/treasurehunt/get/state', function (req, res, next) {
  eventService.getUserStateForEvent(req, res, function (state) {
    res.json({data: state});
    res.end();
  });
});

router.post('/treasurehunt/set/state', function (req, res, next) {
  console.log('user ', req.body.user);
  const model = new UserEventStateModel({
    user: req.body.user,
    events: [{
      event: req.body.event,
      stage: 1,
      multiplier: 1,
      completed: false
    }]
  });
  model.save(function (err, model) {
    if (err) {
      res.json({error: 'not registered', data: err});
      res.end();
      return;
    }
    res.json({data: true});
    res.end();
  });
});

router.post('/treasurehunt/question', function (req, res, next) {
  eventService.getUserStageQuestion(req, res, function (currentStageQuestion) {
    const _response = currentStageQuestion.toObject();
    delete _response.answer;
    res.json({data: _response});
    res.end();
  });
});

router.post('/treasurehunt/question/check', function (req, res, next) {
  if (req.body.answer === null || req.body.answer === undefined) {
    res.status(500).send({'error': 'cannot find the answer in the request buddy...'});
  } else {
    eventService.getUserStageQuestion(req, res, function (question) {
      _q = question.toObject();
      const isCorrectAnswer = eventService.checkAnswersSubmitted(req.body.answer, _q.answer);
      isCorrectAnswer ? res.json({data: true}) : res.json({data: false});

      // update the state of the user
      if (isCorrectAnswer) {
        eventService.getUserStateForEvent(req, res, function (state) {
          eventService.updateUserEventState(req, res, state, function () {
            res.end();
          });
        });
      } else {
        res.end();
      }
    });
  }
});

module.exports = router;
