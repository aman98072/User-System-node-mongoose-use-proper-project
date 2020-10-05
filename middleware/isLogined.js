const isLogined = (req, res, next) => {       
    if (!req.session.token) {
        res.redirect("/");
    } 

    next();
}

module.exports = isLogined;