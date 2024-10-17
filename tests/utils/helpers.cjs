'use strict';
const {
  randomEmail,
  randomPassword,
  randomUsername,
  randomDate,
} = require('./data-creator.cjs');
require('dotenv').config();

global.$ConduitAPI = process.env.CONDUIT_API;

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
