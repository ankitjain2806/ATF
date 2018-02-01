var express = require('express');
var EventModel = require('../models/Event');
var TeamModel = require('../models/Team');
var UserEventStateModel = require('../models/UserEventState');
var router = express.Router();

function getUserStateForEvent(req, res, cb) {
    const userId = req.body.user;
    const event = req.body.event;
    if(userId === undefined || event === undefined || userId === null || event === null) {
        cb({'error': 'data supplied is not sufficient buddy..'});
        return;
    }
    // get user current stage
    const query = UserEventStateModel.findOne({'user': "5a71804d4d04951790a33e4f"});
    query.exec((err, data) => {
        if(err) {
            // user is not present
            cb({'error': 'cannot get the state', data: err});
            return;
        }
        console.log('user state', data);
        if(data === null) {
            // new to event
            cb({data: null});
        } else {
            cb({'stage': 0, 'multiplier': 1});
        }
    });
}

function getUserStageQuestion(req, res, cb) {
    getUserStateForEvent(req, res, (currentState) => {
        // get current stage [index] from stages
        // TODO: change 'name' to event id
        const query = EventModel.findOne({'name': 'TreasureHunt'})
            .select({'stages': 1, '_id': 0});
        query.exec((err, data) => {
            const currentStageQuestion = data['stages'][currentState.stage];
            cb(currentStageQuestion);
        });
    });
}

function updateUserEventState(req, res, cb) {
    //update user state
    cb();
}

router.get('/all', function (req, res, next) {
    var query = EventModel.find()
        .select({'name': 1, 'description': 1});
    query.exec(function (err, data) {
        res.json(data);
        res.end();
    });
});

router.post('/team-register', function (req, res, next) {
    const team = new TeamModel(req.body);
    team.save(function (err, team) {
        if (err) {
            res.json(err);
        } else {
            res.json({data: team, message: 'saved'});
        }
        res.end();
    });
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
        res.json(state);
        res.end();
    });
});

router.post('/treasurehunt/set/state', function(req, res, next) {
    const stateModel = {
        user: req.body.user
    };
    // const query = UserEventStateModel.insert(stateModel);
    console.log(query);
    /*query.exec((err, model) => {
        if(err) {
          res.json({'error': '', data: err});
          return;
        }
        res.json({data: true});
        res.end();
    });*/
    res.end();
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
