var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var CompilerResource = require('../../models/CompilerResource');
var EventLog = require('../../models/EventLog');

var router = express.Router();
var async = require('async');
var request = require('request');
var envConfig = require('../../config/env');
var langObj = require('../../config/languageConst');
var amqp = require('amqplib/callback_api');
var socket = require('../../util/socket');

var responseHandler = require('../../util/responseHandler').Response;

router.post('/run', function (req, res, next) {

  // var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var q = 'compilerQueue';
      var code = req.body.code.replace(/(\n\t|\n|\t)/gm, " ");
      var language = req.body.language;
      var lang = langObj[language];
      var testCases;
      var query = CompilerResource.findById(req.body.resourceId).select('testCases');
      async.series([
        function (callback) {
          query.exec(query, function (err, data) {
            if (err) {
              res.json(err);
            } else {
              console.log('data    ' + data);
              testCases = data;
              callback();
            }
          })
        },
        function (callback) {
          console.log('testCase  ' + testCases)
          var obj = {
            langName: lang.name,
            token: envConfig.glotToken,
            ext: lang.ext,
            code: code,
            testCases: testCases
          };
          // Note: on Node 6 Buffer.from(msg) should be used
          ch.sendToQueue(q, new Buffer(JSON.stringify(obj)));
          res.send({data: 'socket is on the way'});
          var resultQueue = 'resultQueue';
          ch.assertQueue(resultQueue, {durable: false});
          ch.consume(resultQueue, function (msg) {
            // console.log(JSON.parse(msg.content.toString()));
            var response = JSON.parse(msg.content.toString())
            delete obj.token;
            var eventLogObj = {
              userId: req.session.user._id,
              eventId: req.body.eventId,
              resourceId: req.body.resourceId,
              log: JSON.stringify(obj),
              points: (!response.err) ? 10 : -10
            };
            console.log("===================================")
            console.log(response)
            console.log("===================================")
            var eventLog = new EventLog(eventLogObj);
            eventLog.save(function (err, data) {
              console.log(err, data)
            });
            socket.send('compilerSocket', response);
          }, {noAck: true});
        }
      ]);
    });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
});

router.get('/resources', function (req, res, next) {
  var query = {
    isActive: true
  };
  var query = CompilerResource.find(query).select('name');
  query.exec(function (err, resources) {
    res.locals.responseObj = {
      err: err,
      data: resources,
      msg: "compiler resources"
    }
    next();
  });
}, responseHandler);

router.post('/addResource', function (req, res, next) {
  var resourceObj = {
    name: req.body.name,
    body: req.body.body,
    testCases: req.body.testCases,
    isActive: req.body.isActive,
  }
  var resource = new CompilerResource(resourceObj);
  resource.save(function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json({msg : 'Resource Saved'})
    }
  })
});

router.get('/getResource/:id', function (req, res, next) {
  var query = CompilerResource.findById(req.params.id).select('name body eventId');
  query.exec(query, function (err, data) {
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: "compiler resources"
    }
    next()
  })
}, responseHandler);

module.exports = router;