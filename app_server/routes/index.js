var express = require('express');
var indexController = require('./../controllers/indexController');
var ctrlLocations = require('./../controllers/ctrlLocations');
var ctrlOthers = require('./../controllers/ctrlOthers');
var router = express.Router();

/*
/ - list 
/location - single location
/location/review/new - new review
/about - about
*/

/* GET home page. */
router.get('/', indexController);

router.get('/about', ctrlOthers.about);

module.exports = router;
