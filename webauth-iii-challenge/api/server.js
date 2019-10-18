const express = require('express');

const helmet = require('helmet')
const cors = require('cors')

const server = express();

const userRouter = require('./routes/users/users-router.js')

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api', userRouter)

server.get('/', (req, res) => {
    const MOTD = "Hello World!"
    res.send(`<h1>${MOTD}</h1>`)
})

module.exports = server;
