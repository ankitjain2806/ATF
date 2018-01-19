var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/googleLogin', function(req, res, next) {
  res.json({'test': 1234});
});
module.exports = router;
