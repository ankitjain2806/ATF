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
			
			async.series([
						function(callback) {
							User.findById(transactionData.user, function (err, person) {
								console.log("PERSON is :" + person._id);
								if (err) {
									callback(err, null)
								}
								if (person) {
									console.log("inside update points", person.totalPoints);
									person.totalPoints += amount;
									console.log("inside update points again ", person.totalPoints);
									person.save(function (err, data) {
										callback(err,data);
									})
								}
							});
						
						},
						function(callback) {
							if (transactionData.fromUser !== null) {
								User.findById( transactionData.fromUser, function (err, person) {
									console.trace(err, person)
									if (err) {
										callback(err, null)
									}
									if (person) {
										person.totalPoints -= amount;
										person.save(function (err, data) {
											callback(err, data);
										})
									}
								});
							}
							else{
								callback();
							}
						},
						function(callback){
							var transData = {
								userId: transactionData.toUser,
								fromUser: transactionData.fromUser,
								eventId: transactionData.eventId,
								description: transactionData.description,
								points: transactionData.amount
							}
							var transaction = new TransactionLog(transData);
							transaction.save(function (err, data) {
								console.log(err, data)
								callback(err,data);
								//ch.ack(msg);
							})
					}
					],
					function(err, results) {
						ch.ack(msg);
					});
		}, {noAck: false});
	});
});

app.listen(3200, function () {
	console.log('Example app listening on port 3200!')
})