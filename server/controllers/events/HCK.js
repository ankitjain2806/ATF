var express = require('express');
var router = express.Router();
var HCKinfoModel = require('../../models/HCKinfo');
//var User = require('../models/User');

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


module.exports = router;