var mongoose = require('mongoose');
var locationModel = mongoose.model('location');

var serverUrl = 'http://localhost:3000/api';
if (process.env.NODE_ENV === 'production') {
    serverUrl = '';
}

var sendJsonResponse = function (res,status,content) {
    res.status = status;
    res.json(content);
}

var locationsListByDistance = function (req,res) {
    
    locationModel
    .find()
    .exec(function(err, locations) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        } 
        sendJsonResponse(res, 200, locations)
    })
}

var locationsCreate = function (req,res) {
    
    let newLocation = {
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingHours: req.body.openingHours.split(",")
    }
    locationModel.create(newLocation, function (err, result) {
        if (err) {
            sendJsonResponse(res, 400, err)    
            return;
        }
        sendJsonResponse(res, 200, {'message': 'success', 'object': result})
    })
}

var locationsReadOne = function (req,res) {
    if (req.params && req.params.locationid)
    {
        locationModel
        .findById(req.params.locationid)
        .exec(function(err,foundLocation) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            } else 
            if (!foundLocation) {
                sendJsonResponse(res, 404, {message : 'Location is not found in DB'})
                return;
            }
            sendJsonResponse(res, 200, foundLocation)
        })
    }
    else {
        sendJsonResponse(res, 404, {message : 'LocationId is not specified in request'})
    }
}

var locationsUpdateOne = function (req,res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {message: 'locationid is required.'})
        return;
    }

    locationModel
    .findById(req.params.locationid)
    .select("-reviews -rating")
    .exec(function(err, location) {
        if (err) {
            sendJsonResponse(res, 400, err)
            return;
        } else 
        if (!location) {
            sendJsonResponse(res, 404, {message: 'Specified location is not found in DB.'})
            return;
        }
        location.name = req.body.name;
        location.address = req.body.address,
        location.facilities = req.body.facilities.split(","),
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        location.openingHours = req.body.openingHours.split(",")

        location.save(function(err) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else 
            sendJsonResponse(res, 200, {'status':'success'});
        })
        
    })
}

var locationsDeleteOne = function (req,res) {
    if (!req.params.locationid) {
        sendJsonResponse(req,404, {message:'locationid is not provided'});
        return;
    }
    locationModel
    .findByIdAndRemove(req.params.locationid)
    .exec(function(err){
        if (err) {
            sendJsonResponse(req,400, err);
            return;
        } else
         {
            sendJsonResponse(req,204, {message:'success'});
        }
    })
}

module.exports.locationsListByDistance = locationsListByDistance;
module.exports.locationsCreate = locationsCreate;
module.exports.locationsReadOne = locationsReadOne;
module.exports.locationsUpdateOne = locationsUpdateOne;
module.exports.locationsDeleteOne = locationsDeleteOne;