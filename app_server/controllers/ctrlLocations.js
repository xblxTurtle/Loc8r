var request = require('request')

var serverUrl = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
    serverUrl = 'https://'+process.env.HEROKU_APP_NAME+".herokuapp.com";
}

let homeList = function (req,resp,next) {

    let options = {
        url: serverUrl + '/api/locations',
        method: 'GET'
    }

    request(options, function(error, response, body) {
        let message;
        if (error) {
            resp.render('error', error);
            return;
        }
        if ((response.statusCode !== 200)) {
            message = "API lookup error \n" + body;
            body = '[]';
        }
        let data = {
            title: 'Loc8r - find a place to work with wifi',
            pageHeader: {
                title: 'Loc8r',
                strapline: 'Find places to work with wifi near you!'
            },
            sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
            locations: JSON.parse(body),
            errormessage: message
        }
        resp.render('index', data);
    })

    /*resp.render('index', 
    {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [
            {
                name: "Honest Burger",
                rating: 3,
                distance: 100,
                address: "125 High street, Reading, RG6 1PS",
                facilities: ["toilet", "tables", "heating"]
            },
            {
                name: "Starbucks",
                rating: 4,
                distance: 200,
                address: "15 Marlborough street, London, N13 W24",
                facilities: ["tables"]
            }
        ]
    })*/
}

processLocationInfo = function (req, resp, renderPage) {
    let options = {
        url: serverUrl + '/api/locations/' + req.params.locationid,
        method: 'GET'
    }

    request(options, function(error, response, body) {
        
        if (error) {
            resp.render('error', error);
            return;
        }
        if ((response.statusCode !== 200)) {
            resp.render('generic-text', {
                title : 'API lookup error',
                text : body,
                status: response.statusCode
              });
            return;
        }
        
        let data = JSON.parse(body);
        data.distance = 100;
        
        renderPage(req, resp, data)
    })
}

let renderLocationInfoPage = function (req, resp, data) {
    data.title = 'Location';
    data.sidebar = "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.";
   
    resp.render('location', data);
}

let locationInfo = function (req,resp,next) {
    processLocationInfo(req,resp, renderLocationInfoPage)
}

let renderAddReviewPage = function (req, resp, data) {
    data.title = 'Add Review';
    data.error = req.query.err;
    resp.render('addReview', data);
}

let addReview =  function (req,resp,next) {
    processLocationInfo(req,resp, renderAddReviewPage)   
}

let doAddReview = function (req, resp, next) {
    let postData = {
        rating: parseInt(req.body.rating),
        name: req.body.name,
        text: req.body.review
    };
    let options = {
        url: serverUrl + '/api/locations/'+req.params.locationid+'/reviews/',
        method: 'POST',
        json: postData
    }
    
    if (!postData.rating || !postData.name || !postData.text) {
        resp.redirect("/location/review/new/"+ req.params.locationid +"?err=val");
    }
    else {
        request(options, function(error, response, body) {
            if (error) {
                resp.render('error', error);
                return;
            }
            if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                resp.redirect("/location/review/new/"+ req.params.locationid +"?err=val");
            }
            if ((response.statusCode !== 201)) {
                resp.render('generic-text', {
                    title : 'API lookup error',
                    text : body,
                    status: response.statusCode
                });
                return;
            }
            resp.redirect('/location/' + req.params.locationid);

        })
    }       
}

module.exports.homeList = homeList;
module.exports.locationInfo = locationInfo;
module.exports.addReview = addReview;
module.exports.doAddReview = doAddReview;
