const express = require('express');

const router = express.Router();

const {validateUser, validateUserId, validatePost} = require('../middleware/validation/index');

const Users = require('./userDb');

const Posts = require('../posts/postDb');

// CREATE
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const user_id = req.user.id
    const text = req.body.text
    Posts.insert({text, user_id})
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// READ
router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id
    Users.getUserPosts(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// UPDATE
router.put('/:id', validateUserId, validateUser, (req, res) => {
    Users.update(req.user.id, req.body)
    .then(user => {
        res.status(201).json(req.body)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// DELETE
router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.user.id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;
