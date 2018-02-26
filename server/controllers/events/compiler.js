var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var CompilerResource = require('../../models/CompilerResource');
var CompilerDrafts = require('../../models/CompilerDrafts');
var CompilerLog = require('../../models/CompilerLog');

var router = express.Router();
var async = require('async');
var request = require('request');
var envConfig = require('../../config/env');
var langObj = require('../../config/languageConst');
var amqp = require('amqplib/callback_api');
var socket = require('../../util/socket');

var responseHandler = require('../../util/responseHandler').Response;

var compilerMQSocket = function (user) {
  amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var resultQueue = 'resultQueue';
      ch.assertQueue(resultQueue, {durable: false});
      ch.consume(resultQueue, function (msg) {
        var response = JSON.parse(msg.content.toString())
        /* var logObj = {
          userId: req.session.user._id,
          resourceId: req.body.resourceId,
          code: code,
          points: (!response.err) ? 10 : -10
        };
        var eventLog = new EventLog(eventLogObj);
        eventLog.save(function (err, data) {
          console.log(err, data)
        });*/
        socket.send('compilerSocket', {
          testCaseNumber: response.index,
          testCasePass: response.testCasePass
        }, response.userId);
      }, {noAck: true});
    });
  });
};

compilerMQSocket();
router.post('/run', function (req, res, next) {
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
              // .log('data    ' + data);
              testCases = data;
              callback();
            }
          })
        },
        function (callback) {
          // console.log('testCase  ' + testCases)
          var obj = {
            langName: lang.name,
            token: envConfig.glotToken,
            ext: lang.ext,
            code: code,
            testCases: testCases,
            userId: req.session.user._id
          };
          // Note: on Node 6 Buffer.from(msg) should be used
          ch.sendToQueue(q, new Buffer(JSON.stringify(obj)));
          res.send({data: 'socket is on the way'});

          /*-----------------------------------------------------------*/

        }
      ]);
    });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
});

router.get('/resources', function (req, res, next) {
  var query = {
    isActive: true,
    isCurrent: true,
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
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: 'resource added'
    };
    next();
  })
}, responseHandler);

router.post('/saveDraft', function (req, res, next) {
  var query = {
    'userId': req.session.user._id,
    'compilerResourceId': req.body.resourceId
  };
  var body = {
    code: req.body.code,
    language: req.body.language,
    userId: req.session.user._id,
    compilerResourceId: req.body.resourceId,
    lastUpdated: new Date()
  }
  CompilerDrafts.findOneAndUpdate(query, body, {upsert: true, 'new': true}, function (err, data) {
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: 'draft saved'
    };
    next();
  });
}, responseHandler)

router.get('/getResource/:id', function (req, res, next) {
  async.series({
    resource: function (callback) {
      var query = CompilerResource.findOne({id: req.params.id, isCurrent: true}).select('name body eventId');
      query.exec(query, function (err, data) {
        callback(err, data);
      })
    },
    draft: function (callback) {
      var query = {
        'userId': req.session.user._id,
        'compilerResourceId': req.params.id
      };
      CompilerDrafts.findOne(query, function (err, data) {
        callback(err, data);
      });
    }
  }, function (err, results) {
    res.locals.responseObj = {
      err: err,
      data: results,
      msg: "compiler resources"
    }
    next();
  });
}, responseHandler);

module.exports = router;