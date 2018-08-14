var express = require('express');
var ctrlLocations = require('./../controllers/ctrlLocations');
var ctrlOthers = require('./../controllers/ctrlOthers');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlLocations.homeList);

/* GET About page. */
router.get('/about', ctrlOthers.about);

/* GET Add new review page. */
router.get('/location/review/new', ctrlLocations.addReview)

/* GET Location page. */
router.get('/location', ctrlLocations.locationInfo)

module.exports = router;
