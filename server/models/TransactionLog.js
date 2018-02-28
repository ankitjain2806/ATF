var mongoose = require('mongoose');
var TransactionLogSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	fromUser : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
	description: String,
	points: Number
});
var TransactionLog = mongoose.model('TransactionLog', TransactionLogSchema);
module.exports = TransactionLog;
