var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var UserEventStateSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    events: [new Schema({
        event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
        stage: Number,
        multiplier: Number,
        completed: Boolean
    })],
    lastUpdated: { type: Date, default: Date.now }
});
var UserEventState = mongoose.model('UserEventState', UserEventStateSchema);
module.exports = UserEventState;
