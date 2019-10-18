const db = require('../../../data/dbConfig.js')

module.exports = {
    add,
    find
}

function find(filter) {
    if (filter) {
        return db('users')
        .where(filter)
    } else {
        return db('users')
    }
}

function add(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        const [id] = ids
        return db('users')
        .where({id})
    })
}