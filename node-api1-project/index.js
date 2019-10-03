const express = require('express');

const server = express();

// This is necessary to use json
server.use(express.json());

const port = 8000

const Users = require('./data/db');

server.listen(port, () => {
    console.log(`\n == API listening on port ${port} == \n`)
})

// POST request

server.post('/api/users', (req, res) => {
    const newUser = req.body
    console.log("This is a post request!")
    if (!newUser.name) {
        res.status(400).json({message: "Please add a user's name!"})
    }
    else if (!newUser.bio) {
        res.status(400).json({message: "Please add a user's bio!"})
    } else {
        Users.insert(newUser)
        .then(newUser => {
            res.status(201).json({message: "This is the user you have added", newUser})
        })
        .catch(err => {
            res.status(500).json({message: "There was an error adding a user", err})
        })
    }
})

// GET request

server.get('/api/users', (req, res) => {
    console.log("This is a get request!")
    Users.find()
    .then(users => {
        res.status(200).json({message: "These are the users", users})
    })
    .catch(err => {
        res.status(500).json({message: "There was an error retrieving users", err})
    })
})

// GET request by ID

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    console.log(`This is a get request by ${userId}`)
    if (!userId) {
        res.status(404).json({message: "There is no user by that id #!"})
    } else {
        Users.findById(userId)
        .then(user => {
            res.status(200).json({message: "This is the user by that id #", user})
        })
        .catch(err => {
            res.status(500).json({message: "There was an error retrieving a user by that ID", err})
        })
    }   
})

// PUT request (by ID)

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const changes = req.body
    if (!userId) {
        res.status(404).json({message: "There is no user by that id #!"})
    } 
    else if (!changes.name) {
        res.status(400).json({message: "Please update a user's name!"})
    }
    else if (!changes.bio) {
        res.status(400).json({message: "Please update a user's bio!"})
    } else {
        Users.update(userId, changes)
        .then(user => {
            res.status(200).json({message: "The user has been updated", user})
        })
        .catch(err => {
            res.status(500).json({message: "There was an error updating the user by that ID", err})
        })
    }
})

// DEL request (by ID)

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    console.log("This is a delete request")
    if (!userId) {
        res.status(404).json({message: "There is no user by that id #!"})
    } else {
        Users.remove(userId)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error deleting the user by that ID", err})
        })
    }
})