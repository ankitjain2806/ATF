var express = require('express');
var EventModel = require('../models/Event');
var TeamModel = require('../models/Team');
var User = require('../models/User');
var UserEventStateModel = require('../models/UserEventState');
var router = express.Router();
var async = require('async');

function getUserStateForEvent(req, res, cb) {
  const userId = req.body.user;
  const event = req.body.event;
  if (userId === undefined || event === undefined || userId === null || event === null) {
    cb({'error': 'data supplied is not sufficient buddy..'});
    return;
  }
  /**get user current stage*/
  const query = UserEventStateModel.findOne({'user': userId});
  query.select('events');
  query.exec(function (err, data) {
    if (err) {
      /**user is not present*/
      cb({'error': 'cannot get the state', data: err});
      return;
    }
    if (data === null) {
      /**new to event*/
      cb(null);
      return;
    }
    const _events = data.events;
    const _state = _events.filter(function (item) {
      return item.event.toString() === event;
    });
    cb(_state);
  });
}

function getUserStageQuestion(req, res, cb) {
  getUserStateForEvent(req, res, function (currentState) {
    // get current stage [index] from stages
    // TODO: change 'name' to event id
    console.log('current state of user ', currentState[0]);
    const query = EventModel.findOne({'name': 'TreasureHunt'})
      .select({'stages': 1, '_id': 0});
    query.exec(function (err, data) {
      // console.log('questions ', data['stages'][currentState[0].stage]);
      const currentStageQuestion = data['stages'][currentState[0].stage];
      cb(currentStageQuestion);
    });
  });
}

function updateUserEventState(req, res, state, cb) {
  console.log('-------------updating........');
  //update user state
  const userId = req.body.user;
  const event = req.body.event;
  if (userId === undefined || event === undefined || userId === null || event === null) {
    cb({'error': 'data supplied is not sufficient buddy..'});
    return;
  }

  /**update user current stage*/
  console.log('updateUserEventState ', userId, ' ', event);
  UserEventStateModel.update({'user': userId, 'events.event': event}, {'$inc': {'events.$.stage': 1}}, function (err) {
    console.log('err', err);
    if (err) {
      res['error'] = 'cannot update the user state';
      res['data'] = err;
      cb();
    }
  });
}

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
      var query = {
        events: {"$in": [event.id]},
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
            if(!user.events){
              user.events = [];
            }
            user.events.push(eventId);
            user.save(function(err, data){
              next(null, data)
            })
          });
        }, function (err, members) {
            res.json({ data : 'teamRegistered'})
        });
      },
    ]
  );
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
  getUserStateForEvent(req, res, function (state) {
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
      stage: 0,
      multiplier: 1
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
  getUserStageQuestion(req, res, function (currentStageQuestion) {
    res.json(currentStageQuestion);
    res.end();
  });
});

router.post('/treasurehunt/question/check', function (req, res, next) {
  if (req.body.answer === null || req.body.answer === undefined) {
    res.status(500).send({'error': 'cannot find the answer in the request buddy...'});
  } else {
    getUserStageQuestion(req, res, function (question) {
      _q = question.toObject();
      const isCorrectAnswer = _q.answer[0] === req.body.answer;
      isCorrectAnswer ? res.json({data: true}) : res.json({data: false});

      // update the state of the user
      if (isCorrectAnswer) {
        updateUserEventState(req, res, undefined, function () {
          res.end();
        });
      } else {
        res.end();
      }
    });
  }
});

module.exports = router;
