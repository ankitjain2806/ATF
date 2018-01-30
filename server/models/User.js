var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: {
        familyName: String,
        givenName: String
    },
    isActive: Boolean,
    email: String,
    imageUrl: String,
    provider: String,
    providerData: Schema.Types.Mixed,
    lastUpdated: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
