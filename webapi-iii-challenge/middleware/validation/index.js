const Users = require('../../users/userDb');

function validatePost(req, res, next) {
    const body = req.body
    const text = req.body.text
    if (Object.keys(body).length === 0) {
        res.status(400).json({message: "Missing user data"})
    } else if (!text) {
        res.status(400).json({message: "Missing required text field"})
    } else {
        next();
    }
};

function validateUser(req, res, next) {
    const body = req.body
    const name = req.body.name
    if (Object.keys(body).length === 0) {
        res.status(400).json({message: "Missing user data"})
    } 
    else if (!name) {
        res.status(400).json({message: "Missing required name field"})
    } else {
        next()
    }
};

function validateUserId(req, res, next) {
    const id = req.params.id
    Users.getById(id)
    .then(user => {
        if (user) {
            req.user = user
            next()
        } else {
            res.status(400).json({message: "Invalid user id"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
};

module.exports = {
    validatePost,
    validateUser,
    validateUserId
}