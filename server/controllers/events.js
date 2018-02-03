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
    const query = UserEventStateModel.findOne({'user': userId});
    query.select('events');
    query.exec((err, data) => {
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
        const _state = _events.filter((item) => {
            return item.event.toString() === event;
        });
        cb(_state);
    });
}

function getUserStageQuestion(req, res, cb) {
    getUserStateForEvent(req, res, (currentState) => {
        // get current stage [index] from stages
        // TODO: change 'name' to event id
        console.log('current state of user ', currentState[0]);
        const query = EventModel.findOne({'name': 'TreasureHunt'})
            .select({'stages': 1, '_id': 0});
        query.exec((err, data) => {
            console.log('questions ', data['stages'][currentState[0].stage]);
            const currentStageQuestion = data['stages'][currentState[0].stage];
            cb(currentStageQuestion);
        });
    });
}

function updateUserEventState(req, res, cb) {
    //update user state
    cb();
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
    var query = EventModel.find()
        .select({'name': 1, 'description': 1});
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
                EventModel.findOne({slug: req.params.slug}, function (err, event) {
                    if (err) {
                        console.trace(err)
                    }
                    teamNData.eventId = event.id
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
                                providerData: ""
                            });
                            user.save(function (err, data) {
                                // request.session.user = data;
                                return done(err, data);
                            })
                        }
                    });
                }, function (err, members) {
                    teamData.members = members;
                    var team = new TeamModel(teamData);
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

router.get('/treasurehunt/details', function(req, res, next) {
    const query = EventModel.findOne({'name': 'TreasureHunt'})
        .select({'title': 1, 'description': 1});
    query.exec((err, data) => {
        res.json({data: data});
        res.end();
    });
});

router.post('/treasurehunt/get/state', function(req, res, next) {
    getUserStateForEvent(req, res, (state) => {
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
    model.save((err, model) => {
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
    getUserStageQuestion(req, res, (currentStageQuestion) => {
        res.json(currentStageQuestion);
        res.end();
    });
});

router.post('/treasurehunt/question/check', function(req, res, next) {
    if(req.body.answer === null || req.body.answer === undefined) {
        res.status(500).send({'error': 'cannot find the answer in the request buddy...'});
    } else {
        getUserStageQuestion(req, res, (question) => {
            console.log('question hre', question.answer);
            console.log('ans', req.body.answer.value);
            const isCorrectAnswer = question.answer === req.body.answer.value;
            isCorrectAnswer ? res.json({data: true}) : res.json({data: false});

            // update the state of the user
            if(isCorrectAnswer) {
                updateUserEventState(req, res, () => {
                    res.end();
                });
            } else {
                res.end();
            }
        });
    }
});

module.exports = router;
