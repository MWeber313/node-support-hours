const bcrypt = require('bcryptjs')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'mack', password: bcrypt.hashSync('pass', 10), department: 'internal affairs'},
        {username: 'taran', password: bcrypt.hashSync('pass', 10), department: 'defense'},
        {username: 'jarvise', password: bcrypt.hashSync('pass', 10), department: 'internal affairs'},
        {username: 'noah', password: bcrypt.hashSync('pass', 10), department: 'defense'},
        {username: 'kristin', password: bcrypt.hashSync('pass', 10), department: 'internal affairs'},
        {username: 'melissa', password: bcrypt.hashSync('pass', 10), department: 'defense'},
      ]);
    });
};
