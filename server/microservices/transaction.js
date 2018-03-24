var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var User = require('../models/User');
var TransactionLog = require('../models/TransactionLog');
var async = require('async');
var request = require('request');
var db = require('../config/db_connect');
amqp.connect('amqp://localhost:5672', function (err, conn) {
	// console.log(err,conn)
	conn.createChannel(function (err, ch) {
		var q = 'transactionQueue';
		
		ch.assertQueue(q, {durable: false});
		ch.prefetch(1);
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function (msg) {
			//do stuff here
			var transactionData = msg.content.toString();
			transactionData = JSON.parse(transactionData)
			
			console.log("---------------------------")
			console.log(transactionData)
			console.log("---------------------------")

			// transactionData = JSON.parse(transactionData);
			var amount = transactionData.points;
			TransactionLog.findOne({userId: transactionData.user,eventId : transactionData.eventId,resourceId: transactionData.resourceId},
				function (err, transaction){
					if(err){
						console.log('got the transaction err ',err);
					}else if(transaction == null) {
						console.log('inside Else');
						transaction = new TransactionLog({
							userId: transactionData.user,
							fromUser : transactionData.fromUser,
							eventId: transactionData.eventId,
							resourceId: transactionData.resourceId,
							description: transactionData.description,
							negPoints : 0,
							posPoints: null,
							points: null,
						});
				} else {
						console.log('got the transaction data ',transaction);
					}
					if(amount >=0){
						transaction.posPoints = amount;
						console.log('posPoints');
					}
					else {
						transaction.negPoints++;
						transaction.posPoints=0;
					}
					var negMulti = -1;
					if(transaction.eventId='compiler'){
						negMulti = -50;
					}
					transaction.points = transaction.negPoints*negMulti + transaction.posPoints;
					console.log('final transaction ', transaction);
					transaction.save(function (err, data) {
						});
			});
		}, {noAck: true});
	});
});

app.listen(3200, function () {
	console.log('Example app listening on port 3200!')
})