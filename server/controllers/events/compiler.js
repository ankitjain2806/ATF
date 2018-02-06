var express = require('express');
var EventModel = require('../../models/Event');
var User = require('../../models/User');
var router = express.Router();
var async = require('async');
var request = require('request');
var envConfig = require('../../config/env');
var langObj = require('../../config/languageConst');

router.post('/run', function (req, res, next) {

    console.log("in the unnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

    var code = req.body.code.replace(/(\n\t|\n|\t)/gm," ");
    var language= req.body.language;
    var lang = langObj[language];
    console.log(code);
    var options = {
        method: 'POST',
        url: 'https://run.glot.io/languages/'+lang.name+'/latest',
        headers: {
            'Authorization': envConfig.glotToken,
            'Content-type': 'application/json'
        },
        json: {"files": [{"name": "main."+lang.ext , "content": code
            }]
        }
    }

    function callback(error, response, body) {
        // console.log('callback');
        // console.log(error);
        //console.log('statusCode:', response && response.statusCode);
        //console.log(error);
        //console.log(body);
        //console.log(response.statusCode);
        if (!error && response.statusCode == 200) {

            //console.log('success');
            //console.log(response.body);

            res.json(response.body);
        }
    }
    request(options, callback);
});


module.exports = router;