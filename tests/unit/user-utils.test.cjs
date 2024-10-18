'use strict';

const assert = require('node:assert');
const { test } = require('node:test');
const { createTestUserData } = require('../utils/user/user-utils.cjs');

test('createTestUserData generates valid user data', () => {
  const userData = createTestUserData();
  assert.ok(userData.user.email, 'Email should be defined');
  assert.ok(userData.user.password, 'Password should be defined');
  assert.ok(userData.user.username, 'Username should be defined');

  // Validate formats
  assert.match(
    userData.user.email,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Email format is invalid'
  );
  assert.strictEqual(
    typeof userData.user.password,
    'string',
    'Password should be a string'
  );
  assert.strictEqual(
    typeof userData.user.username,
    'string',
    'Username should be a string'
  );
});
