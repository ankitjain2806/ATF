var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechTalkSchema = new Schema({
  topic: String,
  slug: String,
  description: String,
  otherDetails : {type: Schema.Types.Mixed, default: {}},
  isActive: {type: Boolean, default: true},
  users: [{
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isBlocked: {type: Boolean, default: false}
  }],
  lastUpdated: {type: Date, default: Date.now},
});
var TechTalk = mongoose.model('TechTalk', TechTalkSchema);
module.exports = TechTalk;
