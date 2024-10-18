'use strict';

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { request } = require('undici');
const {
  getTestUserData,
  createTestUserData,
} = require('../../utils/user/user-utils.cjs');
const { env } = require('../../utils/env.cjs');
const { createRequestOptions } = require('../../utils/http/http-utils.cjs');

const $ConduitAPI = env.conduitAPI;
const testUserData = getTestUserData().user;

describe('User Registration Tests', () => {
  test('Register with valid data should succeed', async () => {
    // Arrange
    const newUserData = createTestUserData();

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 201, 'Expected status code 201');
    assert.strictEqual(
      responseBody.user.email,
      newUserData.user.email,
      'Email should match'
    );
    assert.strictEqual(
      responseBody.user.username,
      newUserData.user.username,
      'Username should match'
    );
    assert.ok(
      responseBody.user.token,
      'Token should be returned upon registration'
    );
  });

  test('Register without email field should fail', async () => {
    // Arrange
    const newUserData = createTestUserData();
    delete newUserData.user.email;

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.strictEqual(
      responseBody.errors.email[0],
      "can't be blank",
      'Should return email cannot be blank error'
    );
  });

  test('Register without password field should fail', async () => {
    // Arrange
    const newUserData = createTestUserData();
    delete newUserData.user.password;

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.strictEqual(
      responseBody.errors.password[0],
      "can't be blank",
      'Should return password cannot be blank error'
    );
  });

  test('Register without username field should fail', async () => {
    // Arrange
    const newUserData = createTestUserData();
    delete newUserData.user.username;

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.strictEqual(
      responseBody.errors.username[0],
      "can't be blank",
      'Should return username cannot be blank error'
    );
  });

  test('Register with existing email should fail', async () => {
    // Arrange
    const newUserData = { user: testUserData };

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.strictEqual(
      responseBody.errors.email[0],
      'has already been taken',
      'Should return email has already been taken error'
    );
  });

  test('Register with existing username should fail', async () => {
    // Arrange
    const newUserData = { user: testUserData };

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.strictEqual(
      responseBody.errors.username[0],
      'has already been taken',
      'Should return username has already been taken error'
    );
  });

  test('Register with invalid email format should fail', async () => {
    // Arrange
    const newUserData = createTestUserData();
    newUserData.user.email = 'invalid-email';

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.ok(
      responseBody.errors.email,
      'Should return error for invalid email format'
    );
  });

  test('Register without password should fail', async () => {
    // Arrange
    const newUserData = createTestUserData();
    newUserData.user.password = '';

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.ok(
      responseBody.errors.password,
      'Should return error for password being too short'
    );
  });

  test('Register with empty request body should fail', async () => {
    // Arrange
    const newUserData = {};

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );
    const responseBody = await response.body.json();

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
    assert.ok(
      responseBody.errors,
      'Should return errors for missing user data'
    );
  });

  test('Register with all fields empty should fail', async () => {
    // Arrange
    const newUserData = {
      user: {
        email: '',
        password: '',
        username: '',
      },
    };

    // Act
    const response = await request(
      `${$ConduitAPI}/users`,
      createRequestOptions('POST', newUserData)
    );

    // Assert
    assert.strictEqual(response.statusCode, 422, 'Expected status code 422');
  });
});
