'use strict';
const {
  randomEmail,
  randomPassword,
  randomUsername,
} = require('./data-creator.cjs');

function createTestUser() {
  return {
    user: {
      email: randomEmail(10, 5),
      password: randomPassword(10),
      username: randomUsername(10),
    },
  };
}

module.exports = {
  createTestUser,
};
