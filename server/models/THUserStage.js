var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var THUserStageSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  stage: Number,
  completed: Boolean,
  lastUpdated: { type: Date, default: Date.now }
});
var THUserStage = mongoose.model('THUserStage', THUserStageSchema);
module.exports = THUserStage;
