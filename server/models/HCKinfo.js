var mongoose = require('mongoose');
var HCKinfoSchema = new mongoose.Schema({
    teamName : String,
    members: [{
      userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      gitId : String
    }],
    idea: String,
    resources : [{
      resource : String
    }],
    isCheckedByAdmin : {type: Boolean, default: false},
    isApproved: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    isGitRepoCreated : {type: Boolean, default: false},
    gitRepo : String,
    gitRepoId : String,
});

module.exports = mongoose.model('HCKinfo', HCKinfoSchema);;
