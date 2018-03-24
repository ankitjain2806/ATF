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
      var userId = userInput.userId;
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

      var callGlot = function (codeObj, cb) {
        request(codeObj, function (err, res, body) {
        	console.log(err, body);
					var resultObj;
          if(!err) {
							// var resultQueue = 'resultQueue';
							resultObj = {
								error: body.stderr,
								response: res.body,
								status: res.statusCode,
								testCasePass: (body.stdout === codeObj.stdout),
								index : codeObj.index+1,
								userId: userId,
								resourceId: userInput.resourceId
							};
							console.log(resultObj);
							// updatePoints(resultObj);
							cb(resultObj);
						/* } else {
							cb(resultObj.testCasePass, JSON.stringify(resultObj));
						}*/
						
						// ch.assertQueue(resultQueue, {durable: false});
						// ch.sendToQueue(resultQueue, new Buffer(JSON.stringify(resultObj)));
          } else {
          	//@todo :  handle error
						console.log("this is errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
					}
        })
      }

      var optionArr = []
      async.times(testCases.length, function (n, next) {
        var tempObj = _.cloneDeep(optionsObj)
        tempObj.json.stdin = testCases[n].stdin;
        tempObj.stdout = testCases[n].stdout;
        tempObj.index = n
        next(null, tempObj);
      }, function (err, data) {
        async.map(data, function (x, callback) {
        	callGlot(x, function (resultObj) {
						ch.sendToQueue('resultQueue', new Buffer(JSON.stringify(resultObj)));
						callback(null, resultObj)
					});
         /* callback(null, callGlot(x, function (tcPass, resultObj) {
						console.log(tcPass);
						
					}))*/
        }, function (err, resultObjs) {
        	console.log(err, resultObjs, '----------------------------')
					updatePoints(resultObjs);
          // @todo need to remove
        })
      });
    }, {noAck: true});
  });
});


var updatePoints = function(resultObj){
	amqp.connect('amqp://localhost:5672', function (err, conn) {
		conn.createChannel(function (err, ch) {
			var q = 'transactionQueue';
			var tempObj = {
				user: resultObj[0].userId,
				fromUser: null,
				eventId: 'compiler',
				description: ' this is desc',
				points: 0,
				resourceId:resultObj[0].resourceId
			};
			// if (resultObj.testCasePass) {
			// 	tempObj.points = 10;
			// }
			console.log('stderr-----------',resultObj[0].response.stderr );
			if (resultObj[0].response.stderr && resultObj[0].response.stderr.length > 0) {
				tempObj.points = -1;
			} else {
				resultObj.forEach(function (item) {
			if(item.testCasePass){
				tempObj.points+=10;
			}
			})
		}
			console.log('inside updatePoints Queue',tempObj);
			ch.assertQueue(q, {durable: false});
			ch.sendToQueue(q, new Buffer(JSON.stringify(tempObj)));
		});
	});
}

app.listen(3100, function () {
  console.log('Example app listening on port 3100!')
})