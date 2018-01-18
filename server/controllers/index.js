var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("asdsadasdas")
  res.sendFile(path.join(__dirname + '/inde22x.html'));
});

module.exports = router;
