var mongoose = require('mongoose');
var CompilerLogSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  resourceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Resource'},
  points: Number,
  code: String,
  err: String
});
var CompilerLog = mongoose.model('CompilerLog', CompilerLogSchema);
module.exports = CompilerLog;
