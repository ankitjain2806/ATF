
var mongoose = require('mongoose');

var HCKinfoSchema = new mongoose.Schema({

    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    gitIds: [String],
    idea: String,
    resources : [String],
    isApproved : {type: Boolean, default: false},
    isGitRepoCreated : {type: Boolean, default: false},
    gitRepo : String
});
var HCKinfo = mongoose.model('HCKinfo', HCKinfoSchema);
module.exports = HCKinfo;
