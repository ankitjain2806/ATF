var User = require('../models/User');
var TransactionLog = require('../models/TransactionLog');

var TransactionUtil = {
  savePoints: function (transactionData) {
    console.log('----------------------------------------');
    console.log(transactionData);
    console.log('----------------------------------------');

    // transactionData = JSON.parse(transactionData);
    var amount = transactionData.points;
    User.findById(transactionData.user, function (err, person) {
      console.log("PERSON is :" + person._id);
      if (err) {
        callback(err, null)
      }
      if (person) {
        console.log("inside update points",person.totalPoints);
        person.totalPoints += amount;
				console.log("inside update points again ",person.totalPoints);
        person.save(function (err, data) {
        })
      }
    });
    if (transactionData.fromUser !== null) {
      User.findOne({_id: transactionData.fromUser}, function (err, person) {
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
      fromUser: transactionData.fromUser,
      eventId: transactionData.eventId,
      description: transactionData.description,
      points: transactionData.amount
    }
    var transaction = new TransactionLog(transData);
    transaction.save(function (err, data) {
      console.log(err, data)
    })
  }
}

module.exports = TransactionUtil;