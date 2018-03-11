var express = require('express');
var router = express.Router();
var HCKinfo = require('../../models/HCKinfo');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;

router.post('/saveRegistration', function (req, res, next) {
  console.log(req.body)
  var users = req.body.members;
  var hckMembers;
  async.series([
        function (callback) {
          async.times(users.length, function (n, next) {
            User.findOne({email: users[n].email}, function (err, person) {
              if (err) {
                next()
              }
              if (person) {
                next(null, {userId: person._id, gitId: users[n].gitId})
              } else {
                var user = new User({
                  name: {
                    familyName: "",
                    givenName: ""
                  },
                  isActive: false,
                  email: users[n].email,
                  imageUrl: "",
                  provider: "",
                  isInvited: true,
                  providerData: ""
                });
                user.save(function (err, data) {
                  if (err) {
                    next()
                  } else {
                    next(null, {userId: data._id, gitId: users[n].gitId})
                  }
                })
              }
            });
          }, function (err, members) {
            members.push({userId: req.session.user._id, gitId: req.body.userGitId});
            hckMembers = members;
            callback(null, members);
          });
        },
        function (callback) {
          var HCKData = new HCKinfo({
            members: hckMembers,
            idea: req.body.idea,
            resources: req.body.resources,
            isApproved: false,
            teamName: req.body.teamName,
            gitRepoId: null,
            gitRepo: null,
          });
          HCKData.save(function (err, data) {
            callback(err, data);
          });
        }
      ],
      function (err, results) {
        res.locals.responseObj = {
          err: err,
          data: results[1],
          msg: "members saved"
        }
        next();
      });
}, responseHandler);

router.post('/postinfo/:teamId', function (req, res, next) {
  var HCKData = new HCKinfoModel({
    teamId: req.body.teamId,
    gitIds: req.body.gitIds,
    idea: req.body.idea,
    resources: req.body.resources,
    isApproved: false
  });

  HCKData.save(function (err) {
    if (err)
      res.send(err);
    else {
      res.json({"message": "Information loaded successfully"});
      res.end();
    }
    ;
  });
});

router.get('/getRegistration', function (req, res, next) {
  HCKinfo.find({'members.userId' : req.session.user._id}, function (err, data) {
    res.locals.responseObj = {
      err: err,
      data: data,
      msg: "members saved"
    }
    next();
  })
}, responseHandler)

module.exports = router;