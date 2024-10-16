const {
  setupContext,
  createRequestOptions,
  $ConduitAPI,
} = require('../utils/test-helpers.cjs');
const { test } = require('node:test');
const assert = require('node:assert');
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
    `${$Conduit}/users`,
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
    `${$Conduit}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(data.errors.username[0], 'has already been taken');
});

test('Create user with invalid password', async () => {
  // Arrange
  const userData = createTestUser();
  userData.user.password = '123';

  // Act
  const response = await request(
    `${$Conduit}/users`,
    createRequestOptions('POST', userData)
  );

  const data = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(
    data.errors.password[0],
    'is too short (minimum is 6 characters)'
  );
});
