const express = require('express');

const server = express()

const port = 8000

const postRouter = require('./routes/posts/post-router.js')

server.use(express.json());
server.use('/api/posts', postRouter)

server.listen(port, () => {
    console.log(`\n == Server listening on port ${port} == \n`)
})