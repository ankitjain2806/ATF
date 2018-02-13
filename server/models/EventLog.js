var mongoose = require('mongoose');
var EventLogSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  resourceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
  point: String,
  log: String
});
var EventLog = mongoose.model('EventLog', EventLogSchema);
module.exports = EventLog;
