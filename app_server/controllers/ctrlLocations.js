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

let locationInfo = function (req,resp,next) {

    let options = {
        url: serverUrl + '/api/locations/' + req.params.locationid,
        method: 'GET'
    }

    request(options, function(error, response, body) {
        let message;
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
        let data = JSON.parse(body)
        data.message = message;
        data.distance = 100;
        data.title = 'Location';
        data.sidebar = "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.";
        
        resp.render('location', data);
    })
}

let addReview =  function (req,resp,next) {
    resp.render('addReview', {
        title: 'Add Review',
        placeName: 'Honest Burger',
        authorName: 'Pavel'

    })
}

module.exports.homeList = homeList;
module.exports.locationInfo = locationInfo;
module.exports.addReview = addReview;
