var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechTalkSchema = new Schema({
  topic: String,
  slug: String,
  description: String,
  otherDetails : Schema.Types.Mixed,
  isActive: Boolean,
  users: [{
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isBlocked: Boolean
  }],
  lastUpdated: {type: Date, default: Date.now},
});
var TechTalk = mongoose.model('TechTalk', TechTalkSchema);
module.exports = TechTalk;
