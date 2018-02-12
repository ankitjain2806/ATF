var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var request = require('request')
amqp.connect('amqp://localhost:5672', function (err, conn) {
  // console.log(err,conn)
  conn.createChannel(function (err, ch) {
    var compilerQueue = 'compilerQueue';
    ch.assertQueue(compilerQueue, {durable: false});
    ch.consume(compilerQueue, function (msg) {
      var obj = msg.content.toString();
      obj = JSON.parse(obj);
      var options = {
        method: 'POST',
        url: 'https://run.glot.io/languages/' + obj.langName + '/latest',
        headers: {
          'Authorization': obj.token,
          'Content-type': 'application/json'
        },
        json: {
          "stdin": obj.testCases.testCases[0].stdin,
          "files": [{
            "name": "main." + obj.ext, "content": obj.code
          }]
        }
      };

      function callback(error, response, body) {
        var resultQueue = 'resultQueue';
        var resultObj = {
          error: error,
          response: response.body,
          status: response.statusCode,
          matching:false
        };
        if(obj.testCases.testCases[0].stdout == response.body.stdout){
          resultObj.matching=true;
        }
        // ch.assertQueue(resultQueue, {durable: false});
        ch.sendToQueue(resultQueue, new Buffer(JSON.stringify(resultObj)));
      }

      request(options, callback);
    }, {noAck: true});
  });
});

app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
})