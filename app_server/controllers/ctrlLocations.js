let homeList = function (req,resp,next) {
    resp.render('index', 
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
    })
}

let locationInfo = function (req,resp,next) {
    resp.render('location', {
        title: 'Location',
        name: "Honest Burger",
        rating: 3,
        distance: 100,
        address: "125 High street, Reading, RG6 1PS",
        facilities: ["toilet", "tables", "heating"],
        hours: ["Monday - Friday : 07:00am 07:00pm", "Saturday : 08:00am 05:00pm", "Sunday : Closed"],
        reviews: [
            {
                rating: 5,
                name: "John Malkovich",
                date: "13/01/2018",
                text: "This is the best place ever!"
            },
            {
                rating: 2,
                name: "Jack Rambo",
                date: "01/10/2018",
                text: "Nice place. Food is not ideal, though."
            }
        ],
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    })
}

let addReview =  function (req,resp,next) {
    resp.render('addReview', {title: 'Add Review'})
}

module.exports.homeList = homeList;
module.exports.locationInfo = locationInfo;
module.exports.addReview = addReview;
