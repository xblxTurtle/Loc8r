let about = function (req,resp,next) {
    resp.render('about', {title: "About page"})
}

module.exports.about = about