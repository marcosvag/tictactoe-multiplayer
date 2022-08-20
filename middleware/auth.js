module.exports = {
    ensureAuth: function (request, response, next) {
        if (request.isAuthenticated()) {
            return next()
        } else {
            response.redirect('/')
        }
    },
    ensureGuest: function (request, response, next) {
        if (request.isAuthenticated()) {
            response.render('index')
        } else {
            return next()
        }
    }
}