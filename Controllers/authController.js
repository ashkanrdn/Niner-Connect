exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/Login");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/connections/SavedConnections");
    } else {
        next();
    }
}