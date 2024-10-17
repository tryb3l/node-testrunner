'use strict';
const assert = require('node:assert');
const { test } = require('node:test');
const {
  createTestUser,
  createRequestOptions,
} = require('../../utils/helpers.cjs');
const { request } = require('undici');

test('Create User', async () => {
  // Arrange
  const userData = createTestUser();

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 201);
  assert.strictEqual(data.user.email, userData.user.email);
  assert.strictEqual(data.user.username, userData.user.username);
});

test('Register without email field', async () => {
  // Arrange
  const userData = createTestUser();
  delete userData.user.email;

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(data.errors.email[0], "can't be blank");
});

test('Create user with existing email', async () => {
  // Arrange
  const userData = createTestUser();

  // Act
  await request(`${$ConduitAPI}/users`, createRequestOptions('POST', userData));

  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(data.errors.email[0], 'has already been taken');
});

test('Create user with existing username', async () => {
  // Arrange
  const userData = createTestUser();

  // Act
  await request(`${$ConduitAPI}/users`, createRequestOptions('POST', userData));

  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(data.errors.username[0], 'has already been taken');
});

test('Create user with empty password field', async () => {
  // Arrange
  const userData = createTestUser();
  userData.user.password = null;

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(data.errors.password[0], "can't be blank");
});
