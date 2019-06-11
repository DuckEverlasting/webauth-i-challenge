const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUsers,
  findByUsername
}

function addUser(user) {
  return db('users')
    .insert(user)
}

function findUsers() {
  return db('users').select('id', 'username');
}

function findByUsername(username) {
  return db('users')
    .where('username', username)
    .first();
}