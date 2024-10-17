'use strict';
const { request } = require('undici');
const {
  randomEmail,
  randomPassword,
  randomUsername,
} = require('./data-creator.cjs');
require('dotenv').config();

global.$ConduitAPI = process.env.CONDUIT_API;

function createTestUserData() {
  return {
    user: {
      email: randomEmail(10, 5),
      password: randomPassword(10),
      username: randomUsername(10),
    },
  };
}

async function createTestUser() {
  const newUserData = createTestUserData();
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', newUserData)
  );
  const responseBody = await response.body.json();
  if (response.statusCode !== 201) {
    throw new Error(`Failed to create user: ${JSON.stringify(responseBody)}`);
  }
  return { userData: newUserData.user, userResponse: responseBody.user };
}

async function loginTestUser(userData) {
  const response = await request(
    `${$ConduitAPI}/users/login`,
    createRequestOptions('POST', { user: userData })
  );
  const responseBody = await response.body.json();
  if (response.statusCode !== 200) {
    throw new Error(`Failed to log in user: ${JSON.stringify(data)}`);
  }
  return responseBody.user.token;
}

function createRequestOptions(method, body) {
  return {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

function createAuthorizedRequestOptions(method, body, token) {
  const options = createRequestOptions(method, body);
  options.headers.Authorization = `Token ${token}`;
  return options;
}

function setupContext() {
  return {
    userData: createTestUserData(),
  };
}

module.exports = {
  createTestUserData,
  createTestUser,
  loginTestUser,
  createRequestOptions,
  createAuthorizedRequestOptions,
  randomEmail,
  randomPassword,
  randomUsername,
  setupContext,
};
