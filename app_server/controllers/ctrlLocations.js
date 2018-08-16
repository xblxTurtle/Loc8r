let homeList = function (req,resp,next) {
    resp.render('index', {title: 'Locations list'})
}

let locationInfo = function (req,resp,next) {
    resp.render('location', {title: 'Location'})
}

let addReview =  function (req,resp,next) {
    resp.render('addReview', {title: 'Add Review'})
}

module.exports.homeList = homeList;
module.exports.locationInfo = locationInfo;
module.exports.addReview = addReview;
