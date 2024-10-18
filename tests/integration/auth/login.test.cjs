'use strict';

const assert = require('node:assert');
const { test, before, describe } = require('node:test');
const { request } = require('undici');
const {
  ensureTestUserExists,
  getTestUserData,
  createTestUserData,
} = require('../../utils/user/user-utils.cjs');
const { env } = require('../../utils/env.cjs');
const {
  createRequestOptions,
  createAuthorizedRequestOptions,
} = require('../../utils/http/http-utils.cjs');

const $ConduitAPI = env.conduitAPI;
const testUserData = getTestUserData().user;

before(async () => {
  await ensureTestUserExists();
});

describe('User Login Tests', () => {
  test('Login with valid credentials should succeed', async () => {
    // Arrange
    const loginData = {
      email: testUserData.email,
      password: testUserData.password,
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: loginData })
    );

    // Assert
    assert.strictEqual(response.statusCode, 200, 'Expected status code 200');
  });

  test('Login with incorrect password should fail', async () => {
    // Arrange
    const loginData = {
      email: testUserData.email,
      password: 'incorrectPassword',
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: loginData })
    );

    // Assert
    assert.strictEqual(response.statusCode, 403, 'Expected status code 403');
  });

  test('Login with non-existent email should fail', async () => {
    // Arrange
    const loginData = {
      email: createTestUserData().user.email,
      password: 'somePassword123',
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: loginData })
    );

    // Assert
    assert.strictEqual(response.statusCode, 403, 'Expected status code 403');
  });

  test('Login without email should fail', async () => {
    // Arrange
    const loginData = {
      password: testUserData.password,
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: loginData })
    );

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
  });

  test('Login without password should fail', async () => {
    // Arrange
    const loginData = {
      email: testUserData.email,
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', { user: loginData })
    );

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
  });

  test('Login with empty request body should fail', async () => {
    // Arrange
    const loginData = {};

    // Act
    const response = await request(
      `${$ConduitAPI}/users/login`,
      createRequestOptions('POST', loginData)
    );

    // Assert
    assert.strictEqual(response.statusCode, 500, 'Expected status code 500');
  });

  test('Accessing protected route without token should fail', async () => {
    // Act
    const response = await request(
      `${$ConduitAPI}/user`,
      createRequestOptions('GET')
    );

    // Assert
    assert.strictEqual(response.statusCode, 401, 'Expected status code 401');
  });

  test('Accessing protected route with invalid token should fail', async () => {
    // Arrange
    const invalidToken = 'invalid.token.value';

    // Act
    const response = await request(
      `${$ConduitAPI}/user`,
      createAuthorizedRequestOptions('GET', null, invalidToken)
    );

    // Assert
    assert.strictEqual(response.statusCode, 401, 'Expected status code 401');
  });
});
