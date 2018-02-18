var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var async = require('async');
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
      var i;
      var a=[];
      for(i=0;i<obj.testCases.testCases.length;i++){
        a[i]=function(i) {
            options.json.stdin=obj.testCases.testCases[i].stdin;
            console.log("Test1 in loop" + obj.testCases.testCases[i].stdin);
            request(options, function(err, res, body) {
                var resultObj = {
                    error: err,
                    response: body,
                    status: res.statusCode,
                    matching:false
                };
                if(obj.testCases.testCases[i].stdout == body.stdout){
                    resultObj.matching=true;
                    console.log("Test "+i+" pass:");
                }
                console.log("resulta : "+  JSON.stringify(resultObj));
                //send to queue obj.testCases.testCases[0].stdout
            });
        }
      }
      console.log("value of a"+ a);
      async.parallel([
            function() {
              options.json.stdin=obj.testCases.testCases[0].stdin;
              console.log("Test1" + obj.testCases.testCases[0].stdin);
              request(options, function(err, res, body) {
                var resultObj = {
                  error: err,
                  response: body,
                  status: res.statusCode,
                  matching:false
                };
                if(obj.testCases.testCases[0].stdout == body.stdout){
                  resultObj.matching=true;
                  console.log("Test 0 pass:");
                }
                console.log("resulta : "+  JSON.stringify(resultObj));
                //send to queue obj.testCases.testCases[0].stdout
              });
            },
            function() {
              options.json.stdin=obj.testCases.testCases[1].stdin;
              request(options, function(err, res, body) {
                var resultObj = {
                  error: err,
                  response: body,
                  status: res.statusCode,
                  matching:false
                };
                if(obj.testCases.testCases[1].stdout == body.stdout){
                  resultObj.matching=true;
                  console.log("Test 1 pass:");
                }
                console.log("resultb : "+ JSON.stringify(resultObj));
                //send to queue obj.testCases.testCases[0].stdout
              });
            },
          function() {
              options.json.stdin=obj.testCases.testCases[2].stdin;
              request(options, function(err, res, body) {
                  var resultObj = {
                      error: err,
                      response: body,
                      status: res.statusCode,
                      matching:false
                  };
                  if(obj.testCases.testCases[2].stdout == body.stdout){
                      resultObj.matching=true;
                      console.log("Test 2  pass:");
                  }
                  console.log("resultb : "+ JSON.stringify(resultObj));
                  //send to queue obj.testCases.testCases[0].stdout
              });
          }
          ]);
          request(options, callback);

    }, {noAck: true});
  });
});

app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
})