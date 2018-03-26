var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var async = require('async');
var request = require('request');
var _ = require('lodash');



var updatePoints = function(resultObj){
	amqp.connect('amqp://localhost:5672', function (err, conn) {
		conn.createChannel(function (err, ch) {
			var q = 'transactionQueue'

			console.log("inside update points "+ resultObj.points);
			var tempObj = {
				user: resultObj.userId,
				fromUser: null,
				eventId: 'treasurehunt',
				description: ' this is desc',
				points: resultObj.points
				//resourceId:resultObj[0].resourceI
			};
			// if (resultObj.testCasePass) {
			// 	tempObj.points = 10;
			// }
			//console.log('stderr-----------',resultObj[0].response.stderr );
			/*if (resultObj[0].response.stderr && resultObj[0].response.stderr.length > 0) {
				tempObj.points = -1;
			} else {
				resultObj.forEach(function (item) {
			if(item.testCasePass){
				tempObj.points+=10;
			}
			})
		}*/
			//console.log('inside updatePoints Queue',tempObj);
			ch.assertQueue(q, {durable: false});
			ch.sendToQueue(q, new Buffer(JSON.stringify(tempObj)));
		});
	});
}


module.exports = updatePoints ;