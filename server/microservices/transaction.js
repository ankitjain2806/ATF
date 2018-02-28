var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var User = require('../models/User');
var TransactionLog = require('../models/TransactionLog');
var request = require('request')
amqp.connect('amqp://localhost:5672', function (err, conn) {
  // console.log(err,conn)
  conn.createChannel(function (err, ch) {
    var q = 'transactionQueue';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
			//do stuff here
			var transactionData = msg.content.toString();
			transactionData = JSON.parse(transactionData);
			var amount = transactionData.amount;
			User.findOne({email: transactionData.toUser}, function (err, person) {
				console.trace(err, person)
				if (err) {
					callback(err, null)
				}
				if (person) {
					person.totalPoints += amount;
					person.save(function (err, data) {
					})
				}
			});
			if (fromUser != null){
				User.findOne({email: transactionData.fromUser}, function (err, person) {
					console.trace(err, person)
					if (err) {
						callback(err, null)
					}
					if (person) {
						person.totalPoints -= amount;
						person.save(function (err, data) {
						})
					}
				});
		  }
		  var transData = {
				userId: transactionData.toUser,
				fromUser : transactionData.fromUser,
				eventId: transactionData.eventId,
				description: transactionData.description,
				points: transactionData.amount
      }
      var transaction = new TransactionLog(transData);
			transaction.save(function (err, data) {
			})
		}, {noAck: true});
  });
});

app.listen(3200, function () {
  console.log('Example app listening on port 3200!')
})