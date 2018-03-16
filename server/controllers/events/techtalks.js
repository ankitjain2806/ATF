var express = require('express');
var router = express.Router();
var TechTalks = require('../../models/TechTalks');
var User = require('../../models/User');
var async = require('async');
var responseHandler = require('../../util/responseHandler').Response;
