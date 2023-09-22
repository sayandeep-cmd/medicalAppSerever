const jwt = require('jsonwebtoken')



exports.tokenverification = (req, res, next) => {
    if (req.cookies && req.cookies.AdminToken) {
        jwt.verify(req.cookies.AdminToken, process.env.JWT_SECRET, (err, data) => {
            req.admin = data
            next()
        })
    } else {
        next()
    }
}



