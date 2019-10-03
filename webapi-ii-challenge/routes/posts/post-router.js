// Importing express and setting it to router, with router method invoked
const router = require('express').Router()

// Importing our db file to gain access to the database model
const Posts = require('../../data/db.js'); 

// POST (CREATE)
router.post('/', (req, res) => {
    // We need to check for title and contents
    const newBody = req.body
    if (!newBody.title) {
        res.status(400).json({message: "Please provide a post title"})
    }
    else if (!newBody.contents) {
        res.status(400).json({message: "Please provide post contents"})
    } else {
        Posts.insert(newBody)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "You've encountered an error", err})
        })
}
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id
    const newComment = req.body
    const postId = req.body.post_id
    if (id != postId) {
        res.status(400).json({message: "Please make sure your id and post_id match!"})
    } else {
        Posts.findById(postId)
        .then(post => {
            if (!post.length) {
                res.status(404).json({message: "There is no post by that ID!"})
            } else {
                if (!newComment.text) {
                    res.status(400).json({message: "Please provide comment text!"})
                } else {
                    Posts.insertComment(newComment)
                    .then(post => {
                        res.status(201).json(post)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({message: "There was an error", err})
                    })
                }
            }
        })
    }
})

// GET (READ)
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error", err})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    Posts.findById(id)
    .then(post => {
        if (!post.length) {
            res.status(404).json({message: "There is no post by that ID!"})
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error", err})
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then(post => {
        if (!post.length) {
            res.status(404).json({message: "There is no post by that ID!"})
        } else {
            Posts.findPostComments(id)
            .then(comments => {
                if (!comments.length) {
                    res.status(404).json({message: "There are no comments for this post!"})
                } else {
                    res.status(200).json(comments)
                }
            })
            .catch(err => {
                console.log("There was an error finding post comments", err)
                res.status(500).json({message: "There was an error finding post comments", err})
            })
        }
    })
    .catch(err => {
        console.log("There was an error finding post by ID", err)
        res.status(500).json({message: "There was an error finding post by ID", err})
    })
})

// PUT (UPDATE)
router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Posts.findById(id)
    .then(post => {
        if (!post.length) {
            res.status(404).json({message: "There is no post by that ID!"})
        } else {
            if (!changes.title || !changes.contents) {
                res.status(400).json({message: "Please update post title and/or contents!"})
            } else {
            Posts.update(id, changes)
            .then(post=> {
                console.log(post)
                res.status(200).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "There was an error in the update", err})
            })
            }
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error finding post by ID", err})
    })
})

// DELETE (DELETE)
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then(post => {
        if (!post.length) {
            res.status(404).json({message: "There is no post by that ID!"})
        } else {
            Posts.remove(id)
            .then(() => {
                res.sendStatus(204)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "There was an error deleting", err})
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error finding post by ID", err})
    })
})

module.exports = router;
