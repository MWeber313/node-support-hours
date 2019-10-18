const jwt = require('jsonwebtoken');

const secret = require('../../config/secrets.js')

function generateToken(user) {
    const payload = {
        subject: user.id,
        name: user.username,
        department: user.department
    };
    
    const options = {
        expiresIn: '1h'
    };
    
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateToken