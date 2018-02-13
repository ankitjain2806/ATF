var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {
    familyName: String,
    givenName: String
  },
  email: String,
  imageUrl: String,
  provider: String,
  providerData: Schema.Types.Mixed,
  lastUpdated: {type: Date, default: Date.now},
  isActive: {type: Boolean, default: false},
  isInvited: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},
  totalPoints: {type: Number, default: 0},
  events: [new mongoose.Schema({
      eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
      isBlocked: {type: Boolean, default: false}
  })]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
