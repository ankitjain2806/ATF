var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var async = require('async');
var request = require('request');
var _ = require('lodash');

amqp.connect('amqp://localhost:5672', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var compilerQueue = 'compilerQueue';
    ch.assertQueue(compilerQueue, {durable: false});
    ch.consume(compilerQueue, function (msg) {
      var userInput = msg.content.toString();
      userInput = JSON.parse(userInput);
      var testCases = userInput.testCases.testCases;
      var optionsObj = {
        method: 'POST',
        url: 'https://run.glot.io/languages/' + userInput.langName + '/latest',
        headers: {
          'Authorization': userInput.token,
          'Content-type': 'application/json'
        },
        json: {
          "stdin": null,
          "files": [{
            "name": "main." + userInput.ext, "content": userInput.code
          }]
        },
        stdout: null
      };

      var callGlot = function (codeObj) {
        request(codeObj, function (err, res, body) {
          var resultQueue = 'resultQueue';
          var resultObj = {
            error: err,
            response: res.body,
            status: res.statusCode,
            testCasePass: (body.stdout == codeObj.stdout) ? true : false,
            index : codeObj.index
          };
          // ch.assertQueue(resultQueue, {durable: false});
          ch.sendToQueue(resultQueue, new Buffer(JSON.stringify(resultObj)));
        })
      }

      var optionArr = []
      async.times(testCases.length, function (n, next) {
        var tempObj = _.cloneDeep(optionsObj)
        tempObj.json.stdin = testCases[n].stdin;
        tempObj.stdout = testCases[n].stdout;
        tempObj.index = n;
        next(null, tempObj);
      }, function (err, data) {
        async.map(data, function (x, callback) {
          callback(null, callGlot(x))
        }, function (err, result) {
          // @todo need to remove
        })
      });
    }, {noAck: true});
  });
});


app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
})