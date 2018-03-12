var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var THResource = require('../../models/THResources');
var eventService = require('../../service/events.service');
var responseHandler = require('../../util/responseHandler').Response;
//var userEventState = require('../../models/UserEventState');
var THUserStage = require('../../models/THUserStage');

/*
router.post('/addResource', function (req, res, next) {
  var resourceObj = {
    title: req.body.name,
    body: req.body.body,
    options: req.body.options,
    answer: req.body.answer,
    stage: req.body.stage,
    isMCQ: (Object.keys(req.body.options).length > 0) ? true : false
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
*/
router.post('/get/stage', function (req, res, next) {
  //add entry first
  eventService.getUserStage(req, res, function (currentStage) {
    //check if there is no userevent exist
    if (!currentStage) {
      const model = new THUserStage({
        user: req.body.user,
        stage: 1,
        completed: false,
      });
      model.save(function (err, model) {
        if (err) {
          res.json({error: 'not registered', data: err});
          res.end();
          return;
        }
        res.json({data: true});
      });
    } else {
      res.locals.responseObj = {
        data: currentStage,
        msg: 'user current stage'
      }
      next();
    }
  });

}, responseHandler);

/*
router.post('/set/state', function (req, res, next) {
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
*/
router.post('/question', function (req, res, next) {
  eventService.getUserStageQuestion(req, res, function (currentStageQuestion) {
    const _response = currentStageQuestion.toObject();
    delete _response.answer;
    res.json({data: _response});
    res.end();
  });
});

router.post('/question/check', function (req, res, next) {
  if (req.body.answer === null || req.body.answer === undefined) {
    res.status(500).send({'error': 'cannot find the answer in the request buddy...'});
  } else {
    eventService.getUserStageQuestion(req, res, function (question) {
      _q = question.toObject();
      const isCorrectAnswer = req.body.answer === _q.answer;
      var checkRes = (isCorrectAnswer) ? {data: true, completed: false} : {data: false, completed: false};

      // update the state of the user
      if (isCorrectAnswer) {
        eventService.getUserStage(req, res, function (stage) {
          eventService.updateUserStage(req, res, stage, function (resJson) {
            checkRes.completed = resJson.completed;
            res.json(checkRes);
            res.end();
          });
        });
      } else {
        res.json(checkRes);
        res.end();
      }
    });
  }
});

module.exports = router;