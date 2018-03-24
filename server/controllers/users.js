var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Transaction = require('../models/TransactionLog');
var responseHandler = require('../util/responseHandler').Response;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/events', function (req, res, next) {
  User.findById(req.session.user._id).select('compiler treasureHunt hackathon').exec(function(err, events){
    res.locals.responseObj = {
      err: err,
      data: events,
      msg: "users events"
    }
    next();
  });
},responseHandler);

router.get('/getMyProfile', function (req, res, next) {
  User.findById(req.session.user._id).exec(function (err, user) {
    if(!err) {
      var responseObj = {
        name : user.providerData.displayName,
        email: user.email,
        points: user.totalPoints,
        gender: user.providerData.gender,
        image: user.imageUrl
      }
    }
    res.locals.responseObj = {
      err: err,
      data: responseObj,
      msg: "users profile"
    }
    next();
  })
}, responseHandler)

router.get('/getPoints',function(req,res,next){
    Transaction.find({$or:[{userId:req.userId},{fromUser:req.userId}]}, function(err, result) {
        //{user:req.userId} {userId:req.userId} {$or:[{fromUser:req.userId}]}
        if (err){
            throw err;
        }
        var totalPoints =0 ;
        result.forEach(function(value){

            if(value.userId == req.userId)
                totalPoints+= value.points;
            else
                totalPoints-=value.points;
        });
        res.json({'totalPoints':totalPoints});
    });
}, responseHandler)

module.exports = router;