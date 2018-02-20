var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var responseHandler = require('../../util/responseHandler').Response;
var THResources = require('../../models/THResources')
router.post('/addResource', function (req, res, next) {
  var resourceObj = {
    title: req.body.name,
    body: req.body.body,
    options: req.body.options,
    answer: req.body.answer,
    stage: req.body.stage,
    isMCQ: (Object.keys(req.body.options).length > 0) ? true: false
  }
  var resource = new THResources(resourceObj);
  resource.save(function (err, data) {
    console.log(err, data);
    res.locals.responseObj = {
      err: err,
      data: null,
      msg: 'resource added'
    };
    next();
  })
}, responseHandler);

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