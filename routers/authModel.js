const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  addSession,
  getUsers
}

function addUser(user) {
  return db('users')
    .insert(user)
}

function addSession() {

}

function getUsers() {

}