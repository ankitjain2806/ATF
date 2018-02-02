var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/events/all', function (req, res, next) {
  res.json({'name': 'name', 'description': 'description'});
  res.end();
});

module.exports = router;