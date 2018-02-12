var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var Resources = require('../../models/Resources');
var router = express.Router();
var async = require('async');
var request = require('request');
var envConfig = require('../../config/env');
var langObj = require('../../config/languageConst');
var amqp = require('amqplib/callback_api');
var socket = require('../../util/socket');
router.post('/run', function (req, res, next) {

  // var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'compilerQueue';
      var code = req.body.code.replace(/(\n\t|\n|\t)/gm, " ");
      var language = req.body.language;
      var lang = langObj[language];
      var testCases;
      var query = Resources.findById(req.body.resourceId).select('testCases');
      async.series([
          function(callback) {
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
          function(callback) {
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
              console.log(JSON.parse(msg.content.toString()));
              socket.send('testConnection', {data: JSON.parse(msg.content.toString())})
            }, {noAck: true});
          }
        ]);
    });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
});


module.exports = router;