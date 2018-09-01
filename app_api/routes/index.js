var express = require('express');
var router = express.Router();

var ctrlLocations = require('./../controllers/ctrlLocations');
var ctrlReviews = require('./../controllers/ctrlReviews');

// LOCATIONS

/* GET all locations */
router.get('/locations',ctrlLocations.locationsListByDistance);

/* POST new location */
router.post('/locations',ctrlLocations.locationsCreate);

/* GET one location */
router.get('/locations/:locationid',ctrlLocations.locationsReadOne);

/* PUT existing location */
router.put('/locations/:locationid',ctrlLocations.locationsUpdateOne);

/* DELETE existing location */
router.delete('/locations/:locationid',ctrlLocations.locationsDeleteOne);

// REVIEWS

/* GET one review */
router.get('/locations/:locationid/:reviewid', ctrlReviews.reviewsReadOne);

/* POST new review */
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);

/* PUT existing review */
router.put('/locations/:locationid/:reviewid', ctrlReviews.reviewsUpdateOne);

/* DELETE existing review */
router.delete('/locations/:locationid/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;