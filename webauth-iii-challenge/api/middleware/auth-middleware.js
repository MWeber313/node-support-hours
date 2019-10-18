const jwt = require('jsonwebtoken')
const secret = require('../../config/secrets.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token, could be expired!"})
            } else {
                req.user = decoded
                console.log(req.user)
                next();
            }
        })
    } else {
        res.status(400).json({message: "No token provided on authorization header!"})
    }
}
