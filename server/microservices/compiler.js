var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var request = require('request')
amqp.connect('amqp://localhost:5672', function (err, conn) {
  // console.log(err,conn)
  conn.createChannel(function (err, ch) {
    var q = 'compilerQueue';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      var obj = msg.content.toString();
      obj = JSON.parse(obj);
      console.log(obj.langName, obj.token, obj.ext, obj.code);

      var options = {
        method: 'POST',
        url: 'https://run.glot.io/languages/' + obj.langName + '/latest',
        headers: {
          'Authorization': obj.token,
          'Content-type': 'application/json'
        },
        json: {
          "files": [{
            "name": "main." + obj.ext, "content": obj.code
          }]
        }
      }

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(response.body);
        }
      }
      request(options, callback);
    }, {noAck: true});
  });
});

app.get('/', function (req, res) {


});

app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
})