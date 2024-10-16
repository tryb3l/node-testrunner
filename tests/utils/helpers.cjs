const { beforeEach, afterEach } = require('node:test');
const {
  randomEmail,
  randomPassword,
  randomUsername,
  randomDate,
} = require('./data-creator.cjs');

global.$ConduitAPI = 'https://conduit-api.bondaracademy.com/api';

function createTestUser() {
  return {
    user: {
      email: randomEmail(10, 5),
      password: randomPassword(10),
      username: randomUsername(10),
    },
  };
}

function setupContext() {
  return {
    userData: createTestUser(),
  };
}

function createRequestOptions(method, body) {
  return {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

module.exports = {
  setupContext,
  createRequestOptions,
  createTestUser,
  randomEmail,
  randomPassword,
  randomUsername,
  randomDate,
};
