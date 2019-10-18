const router = require('express').Router();

const Users = require('./users-model.js');

const bcrypt = require('bcryptjs')

const generateToken = require('../../middleware/generateToken');

const restricted = require('../../middleware/auth-middleware.js')

const admin = require('../../middleware/admin-middleware.js')

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.find({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({message: "Invalid Credentials!"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/department', restricted, (req, res) => {
    const {department} = req.user
    Users.find({department})
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/users', restricted, admin, (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
})

module.exports = router;