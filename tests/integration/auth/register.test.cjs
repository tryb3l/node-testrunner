'use strict';
const assert = require('node:assert');
const { test } = require('node:test');
const {
  createTestUser,
  createTestUserData,
  createRequestOptions,
  randomEmail,
  randomPassword,
  randomUsername,
} = require('../../utils/helpers.cjs');
const { request } = require('undici');

test('Create User Successful', async () => {
  // Arrange
  const newUserData = createTestUserData();

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', newUserData)
  );

  const responseBody = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 201);
  assert.strictEqual(responseBody.user.email, newUserData.user.email);
  assert.strictEqual(responseBody.user.username, newUserData.user.username);
});

test('Register without email field', async () => {
  // Arrange
  const userData = createTestUserData();
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

test('Create user with an existing email', async () => {
  // Arrange
  const existingUser = await createTestUser();

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', {
      user: {
        email: existingUser.userData.email,
        password: randomPassword(10),
        username: randomUsername(),
      },
    })
  );

  const responseBody = await response.body.json();

  // Assert
  assert.strictEqual(response.statusCode, 422);
  assert.strictEqual(responseBody.errors.email[0], 'has already been taken');
});

test('Create user with an existing username', async () => {
  // Arrange
  const { user } = createTestUserData();
  const existingUser = await createTestUser();

  // Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', {
      user: {
        email: randomEmail(),
        password: randomPassword(10),
        username: existingUser.userData.username,
      },
    })
  );

  // Assert
  assert.strictEqual(response.statusCode, 422);
});

test('Create user with empty password field', async () => {
  //Arrange/Act
  const response = await request(
    `${$ConduitAPI}/users`,
    createRequestOptions('POST', {
      user: {
        email: randomEmail(),
        username: randomUsername(),
        password: '',
      },
    })
  );

  // Assert
  assert.strictEqual(response.statusCode, 422);
});
