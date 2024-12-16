const mongoose = require('mongoose');
const faker = require('faker')
const {User} = require('./users');

function generateUser(role=false) {
  console.log('Seeding one user to the db');
  const username = `${faker.random.word().replace(/-/g, "").trim().substring(0, 13)}` + `${faker.random.number(99999)}`;
  const user = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    role: role || randomRole(),
    password: faker.internet.password(),
    username: username.replace(/ /g, '')
  };

  return user;

}
function saveUser (user) {
  User
  .create(user);
}

function randomRole() {

  const roles = ['student', 'teacher'];

  return roles[Math.floor(Math.random() * roles.length )]
}

module.exports = {generateUser, saveUser};
