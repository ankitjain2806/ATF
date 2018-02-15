var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompilerDraftSchema = new Schema({
  code: String,
  language: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  compilerResourceId: {type: mongoose.Schema.Types.ObjectId, ref: 'CompilerResource'},
  lastUpdated: {type: Date, default: Date.now},
  isActive: {type: Boolean, default: true},
});
var CompilerDraft = mongoose.model('CompilerDraft', CompilerDraftSchema);
module.exports = CompilerDraft;