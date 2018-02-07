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
    if(userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }
    /**get user current stage*/
    const query = UserEventStateModel.findOne({'user': userId}).select('events');
    query.exec(function(err, data) {
        if(err) {
            /**user is not present*/
            cb({'error': 'cannot get the state', data: err});
            return;
        }
        if(data === null) {
            /**new to event*/
            cb(null);
            return;
        }
        const _events = data.events;
        const _state = _events.filter(function(item) {
            return item.event.toString() === event;
        });
        cb(_state);
    });
}

function getUserStageQuestion(req, res, cb) {
    getUserStateForEvent(req, res, function(currentState) {
        // get current stage [index] from stages
        // TODO: change 'name' to event id
        console.log('current state of user ', currentState[0]);
        const query = EventModel.findOne({'name': 'TreasureHunt'})
            .select({'stages': 1, '_id': 0});
        query.exec(function(err, data) {
            // console.log('questions ', data['stages'][currentState[0].stage]);
            const index = currentState[0].stage - 1;
            const currentStageQuestion = data['stages'][index];
            cb(currentStageQuestion);
        });
    });
}

function neatlyUpdateUserState(userId, event, res, updateObj, cb) {
    UserEventStateModel.update({
        'user': userId,
        'events.event': event
    }, updateObj, function (err) {
        console.log('err', err);
        if (err) {
            res['error'] = 'cannot update the user state';
            res['data'] = err;
            cb();
        }
    });
}

function updateUserEventState(req, res, state, cb) {
    console.log('-------------updating........');
    //update user state
    const userId = req.body.user;
    const event = req.body.event;
    if(userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }
    /**update user current stage*/
    console.log('updateUserEventState ', userId, ' ', event);
    const stagesQuery = EventModel.find({'_id': event}).select({'stages': 1});
    stagesQuery.exec(function (err, rDoc) {
        const numberOfStages = rDoc[0].stages.length || 0;
        const updateQueryObj = {};
        if(numberOfStages === state[0].stage) {
            /**update state to completed */
            updateQueryObj['$set'] = {'events.$.completed': true};
        } else {
            updateQueryObj['$inc'] = {'events.$.stage': 1};
        }
        neatlyUpdateUserState(userId, event, res, updateQueryObj, cb);
    });
}

router.get('/getEventDetails/:slug', function (req, res, next) {
    EventModel.findOne({slug: req.params.slug}, function (err, event) {
        if (err) {
            console.trace(err)
        }
        res.json(event);
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
    var teamData = {
        teamName: req.body.teamName,
        eventId: "",
        members: []
    };
    async.series([
            function (callback) {
                EventModel.findOne({slug: req.body.slug}, function (err, event) {
                    if (err) {
                        console.trace(err)
                    }
                    teamData.eventId = event.id;
                    callback();
                });

            },
            function (callback) {
                // do some more stuff ...
                var users = req.body.members;
                async.times(users.length, function (n, next) {
                    User.findOne({email: users[n].email}, function (err, person) {
                        if (err) {
                            console.trace(err)
                        }
                        if (person) {
                            // members.push(person.id);
                            next(null, person.id)
                        } else {
                            //console.log(profile);
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
                                // request.session.user = data;
                                console.log('new user saved');
                                return done(err, data);
                            })
                        }
                    });
                }, function (err, members) {
                    teamData.members = members;
                    var team = new TeamModel(teamData);
                    console.log('team details' + team);
                    team.save(function (err, team) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({data: team, message: 'saved'});
                        }
                        res.end();
                    });
                });
            }
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
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, rDoc);
                }
            });
        }
    }, function (err, results) {
        if(err) {
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
        if(err) {
            res.json({error: 'cannot get the data', data: false});
            res.end();
        } else {
            const events = rDoc[0].toObject().events;
            const _event = events.filter(e => e.slug === event);
            res.json({data: _event[0].completed});
            res.end();
        }
    });
});



router.get('/treasurehunt/details', function(req, res, next) {
    const query = EventModel.findOne({'name': 'TreasureHunt'})
        .select({'title': 1, 'description': 1});
    query.exec(function(err, data) {
        res.json({data: data});
        res.end();
    });
});

router.post('/treasurehunt/get/state', function(req, res, next) {
    getUserStateForEvent(req, res, function(state) {
        res.json({data: state});
        res.end();
    });
});

router.post('/treasurehunt/set/state', function (req, res, next) {
    const model = new UserEventStateModel({
        user: req.body.user,
        events: [{
            event: req.body.event,
            stage: 1,
            multiplier: 1,
            completed: false
        }]
    });
    model.save(function(err, model) {
        if(err) {
            res.json({error: 'not registered', data: err});
            res.end();
            return;
        }
       res.json({data: true});
       res.end();
    });
});

router.post('/treasurehunt/question', function(req, res, next) {
    getUserStageQuestion(req, res, function(currentStageQuestion) {
        const _response = currentStageQuestion.toObject();
        delete _response.answer;
        res.json({data: _response});
        res.end();
    });
});

function checkAnswersSubmitted(submitted, correct) {
    if(submitted.length !== correct.length) {
        return false;
    }
    for(let i=0; i<submitted.length; i++) {
        const _i = correct.findIndex(x => x === submitted[i]);
        if(_i < 0) {
            /** wrong answer */
            return false;
        }
    }
    return true;
}

router.post('/treasurehunt/question/check', function(req, res, next) {
    if(req.body.answer === null || req.body.answer === undefined) {
        res.status(500).send({'error': 'cannot find the answer in the request buddy...'});
    } else {
        getUserStageQuestion(req, res, function(question) {
            _q = question.toObject();
            const isCorrectAnswer = checkAnswersSubmitted(req.body.answer, _q.answer);
            isCorrectAnswer ? res.json({data: true}) : res.json({data: false});

            // update the state of the user
            if(isCorrectAnswer) {
                getUserStateForEvent(req, res, function (state) {
                    updateUserEventState(req, res, state, function() {
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
