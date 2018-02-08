var express = require('express')
var app = express()
var amqp = require('amqplib/callback_api');
var request = require('request')
amqp.connect('amqp://localhost:5672', function (err, conn) {
  // console.log(err,conn)
  conn.createChannel(function (err, ch) {
    var q = 'transactionQueue';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
    //do stuff here
    }, {noAck: true});
  });
});

app.listen(3200, function () {
  console.log('Example app listening on port 3200!')
})