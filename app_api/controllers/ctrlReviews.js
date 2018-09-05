var mongoose = require('mongoose');
var locationModel = mongoose.model('location');

var sendJsonResponse = function (res,status,content) {
    res.status(status);
    res.json(content);
}

var updateAverageRating = function (locationid) {
    if (locationid) {
        locationModel
        .findById(locationid)
        .select('rating reviews')
        .exec(function (err, location) {
            if (err) {
                sendJsonResponse(res,400,err);
                return;
            } else 
            if (!location) {
                sendJsonResponse(res,400,{'message':'No location found'});
                return;
            }
            let ratingsum = 0
            for (rev of location.reviews) {
                ratingsum +=rev.rating
            }
            location.rating = parseInt(ratingsum / location.reviews.length, 10);
            
            location.save(function (err) {
                if (err) 
                    console.log(err);
                else 
                    console.log('Location\'s average rating updated');
            });
        });
    } else sendJsonResponse(res,404,{'message':'No locationId provided'});
}

var saveLocationRating = function (location) {
    location.save(function (err, result) {
        if (err) {
            sendJsonResponse(res,400,err);
            return;
        }
    })
}

var addReview = function (res, location, newReview) {

    location.reviews.push(newReview);

    location.save(function (err, result){
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        updateAverageRating(location.id)
        sendJsonResponse(res, 201, {'message' : 'success', 'object': result});
    })
}

var reviewsCreate = function (req,res) {
    let locationid = req.params.locationid
    if (locationid) {
        locationModel
        .findById(locationid)
        .select('reviews')
        .exec(function (err, location) {
            if (err) {
                sendJsonResponse(res,400,err);
                return;
            } else 
            if (!location) {
                sendJsonResponse(res,400,{'message':'No location found'});
                return;
            }
            let newReview = {
                rating: req.body.rating,
                name: req.body.name,
                text: req.body.text 
            }
           
            addReview(res, location, newReview)
        })
    } else sendJsonResponse(res,404,{'message':'No locationId provided'});
}

var reviewsDeleteOne = function (req,res) {
    if ((!req.params.locationid)||(!req.params.reviewid)) {
        sendJsonResponse(res, 404, "locationid or reviewid are not specified.")
        return;
    }
    locationModel
    .findById(req.params.locationid)
    .select('reviews')
    .exec(function(err, location) {
        if (err) {
            sendJsonResponse(res, 400, err)
            return;
        } else 
        if (!location) {
            sendJsonResponse(res, 404, `locationid = ${req.params.locationid} is not found in the DB.`)
            return;
        }
        location.reviews.id(req.params.reviewid).remove();
        location.save(function(err) {
            if (err) {
                sendJsonResponse(res, 400, err)
                return;
            } else {
                updateAverageRating(location._id);
                sendJsonResponse(res, 204, {message: 'success'})
            }
    })
})
}

var reviewsUpdateOne = function (req,res) {

    if ((!req.params.locationid)||(!req.params.reviewid))
    {
        sendJsonResponse(res, 404, "locationid or reviewid are not specified.")
        return;
    }
    locationModel
    .findById(req.params.locationid)
    .select('reviews')
    .exec(function(err,location) {
        if (err) {
            sendJsonResponse(res, 400, err)
            return;
        }
        if (!location) {
            sendJsonResponse(res, 404, `locationid = ${req.params.locationid} is not found in the DB.`)
            return;
        }

        let review = location.reviews.id(req.params.reviewid);
        if (!review) {
            sendJsonResponse(res, 404, "reviewid is not found in the DB.")
            return;
        }
        review.rating = req.body.rating;
        review.name = req.body.name;
        review.text = req.body.text;
        location.save(function(err) {
            if (err) {
                sendJsonResponse(res,400,err);
                return;
            }
            else {
                updateAverageRating(location._id);
                sendJsonResponse(res, 200, {'status':'success'})
            }
        })

    })
}

var reviewsReadOne = function (req,res) {
    if (req.params && req.params.locationid && req.params.reviewid)
    {
        locationModel
        .findById(req.params.locationid)
        .select('name reviews')
        .exec(function (err, foundLocation) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            } else 
            if (!foundLocation) {
                sendJsonResponse(res, 404, {message : 'Location is not found in the DB'});
                return;
            }
            if (!foundLocation.reviews || foundLocation.reviews.length === 0) {
                sendJsonResponse(res, 404, {message : 'No reviews found'});
                return;
            }
            let review = foundLocation.reviews.id(req.params.reviewid);
            if (!review) {
                sendJsonResponse(res, 404, {message : 'Review is not found in the DB'});
                return;
            }
            let response = {
                location : {
                  name : foundLocation.name,
                  id : req.params.locationid
                },
                review : review
              };
            sendJsonResponse(res, 200, response);
        })
    } else 
    {
        sendJsonResponse(res, 404, {message : 'LocationId or reviewId is not specified in request'});
    }

}

module.exports.reviewsCreate = reviewsCreate;
module.exports.reviewsDeleteOne = reviewsDeleteOne;
module.exports.reviewsUpdateOne = reviewsUpdateOne;
module.exports.reviewsReadOne = reviewsReadOne;
