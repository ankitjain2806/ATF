var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var router = express.Router();
var async = require('async');
var request = require('request');
var envConfig = require('../../config/env');
var langObj = require('../../config/languageConst');
var amqp = require('amqplib/callback_api');

router.post('/run', function (req, res, next) {

  // var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'compilerQueue';
      var code = req.body.code.replace(/(\n\t|\n|\t)/gm, " ");
      var language = req.body.language;
      var lang = langObj[language];
      var obj = {
        langName :lang.name,
        token: envConfig.glotToken,
        ext: lang.ext,
        code: code
      };

      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer(JSON.stringify(obj)));
      res.send('gonee')
    });
    // setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });

/*  var code = req.body.code.replace(/(\n\t|\n|\t)/gm, " ");
  var language = req.body.language;
  var lang = langObj[language];
  var obj = {
    langName :lang.name,
    token: envConfig.glotToken,
    ext: lang.ext,
    code: code
  };*/

/*  var options = {
    method: 'POST',
    url: 'https://run.glot.io/languages/' + lang.name + '/latest',
    headers: {
      'Authorization': envConfig.glotToken,
      'Content-type': 'application/json'
    },
    json: {
      "files": [{
        "name": "main." + lang.ext, "content": code
      }]
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(response.body);
    }
  }

  request(options, callback);*/
});


module.exports = router;