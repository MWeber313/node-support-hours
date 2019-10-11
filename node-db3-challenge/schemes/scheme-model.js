const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    // console.log('Id, no braces', id)
    // console.log('Id, with braces', {id})
    return db('schemes')
    .where({id})
    .first()
}

function findSteps(id) {
    return db('steps as s')
    .select('s.id', 'schemes.scheme_name', 's.step_number', 's.instructions')
    .join('schemes', 'schemes.id', 's.scheme_id')
    .where('s.scheme_id', id)
    .orderBy('step_number')
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(([id]) => {
        // console.log('Id without brackets', id)
        // console.log('Id with brackets', [id])
        return db('schemes')
        .where({id})
        .first()
    })
}

function update(changes, id) {
    return db('schemes')
    .update(changes)
    .where({id})
    .then(updated => {
        console.log(updated)
        return db('schemes')
        .where({id})
        .first()
    })
}

function remove(id) {
    return db('schemes')
    .where({id})
    .delete()
}