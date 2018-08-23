let about = function (req,resp,next) {
    resp.render('about', {
        title: "About page", 
        paragraphs: [
            "Some text goes here.",
            "Some additional text goes here",
            "What about third paragraph?"
        ]})
}

module.exports.about = about