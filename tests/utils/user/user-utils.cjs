'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { request } = require('undici');
const {
  randomEmail,
  randomPassword,
  randomUsername,
} = require('../data/data-generators.cjs');
const { createRequestOptions } = require('../http/http-utils.cjs');
const { env } = require('../env.cjs');

const $ConduitAPI = env.conduitAPI;

// Load test user data
const testSettingsPath = path.join(__dirname, '../../../test-settings.json');
const testSettings = JSON.parse(fs.readFileSync(testSettingsPath, 'utf8'));
const testUserData = testSettings['test-user'];

async function ensureTestUserExists() {
  try {
    await loginTestUser();
  } catch (error) {
    if (error.message.includes('Failed to log in user')) {
      await createTestUser();
    } else {
      throw error;
    }
  }
}

function createTestUserData() {
  return {
    user: {
      email: randomEmail(),
      password: randomPassword(),
      username: randomUsername(),
    },
  };
}

async function createTestUser() {
  try {
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', { user: testUserData })
    );
    const responseBody = await response.body.json();
    if (response.statusCode !== 201) {
      throw new Error(`User creation failed: ${JSON.stringify(responseBody)}`);
    }
    return { userData: testUserData, userResponse: responseBody.user };
  } catch (error) {
    throw new Error(`createTestUser error: ${error.message}`);
  }
}

async function loginTestUser(userData = testUserData) {
  try {
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: userData })
    );
    const responseBody = await response.body.json();
    if (response.statusCode !== 200) {
      throw new Error(`Failed to log in user: ${JSON.stringify(responseBody)}`);
    }
    return responseBody.user.token;
  } catch (error) {
    throw new Error(`loginTestUser error: ${error.message}`);
  }
}

module.exports = {
  getTestUserData: () => ({ user: testUserData }),
  ensureTestUserExists,
  createTestUser,
  loginTestUser,
  createTestUserData,
};
