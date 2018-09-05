var express = require('express');
var ctrlLocations = require('./../controllers/ctrlLocations');
var ctrlOthers = require('./../controllers/ctrlOthers');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlLocations.homeList);

/* GET About page. */
router.get('/about', ctrlOthers.about);

/* GET Add new review page. */
router.get('/location/review/new/:locationid', ctrlLocations.addReview)

/* POST Send new review page. */
router.post('/location/review/new/:locationid', ctrlLocations.doAddReview)

/* GET Location page. */
router.get('/location/:locationid', ctrlLocations.locationInfo)

/* GET Test page. */    
router.get('/test', function(req,resp,next) {resp.render('test', {title:'Test page'});});

module.exports = router;
