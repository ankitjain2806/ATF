
var mongoose = require('mongoose');

/*var HCKinfoSchema = new mongoose.Schema({

    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    teamName : String,
    teamMemberNames: [String],
    gitIds: [String],
    idea: String,
    resources : [String],
    isApproved : {type: Boolean, default: false},
    isGitRepoCreated : {type: Boolean, default: false},
    gitRepo : String,
    gitRepoId : String,

});*/

var HCKinfoSchema = new mongoose.Schema({
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    teamName : String,
    members: [new mongoose.Schema({
        email : String,
        gitId : String
    })],
    idea: String,
    resources : [new mongoose.Schema({
        resource : String
    })],
    isApproved : {type: Boolean, default: false},
    isGitRepoCreated : {type: Boolean, default: false},
    gitRepo : String,
    gitRepoId : String,
    teamName : String
});

var HCKinfo = mongoose.model('HCKinfo', HCKinfoSchema);
module.exports = HCKinfo;
