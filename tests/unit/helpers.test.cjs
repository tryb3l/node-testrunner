const assert = require('node:assert');
const {
  createRequestOptions,
  createTestUser,
  setupContext,
} = require('../utils/helpers.cjs');
const { test } = require('node:test');

test('createRequestOptions returns correct options', () => {
  const method = 'POST';
  const body = { key: 'value' };
  const options = createRequestOptions(method, body);
  assert.strictEqual(options.method, method, 'HTTP method is incorrect');
  assert.strictEqual(
    options.body,
    JSON.stringify(body),
    'Request body is incorrect'
  );
  assert.deepStrictEqual(
    options.headers,
    { 'Content-Type': 'application/json' },
    'Headers are incorrect'
  );
});

test('createTestUser generates a user with email, password, and username', () => {
  const testUser = createTestUser();
  assert.ok(testUser.user.email, 'Email is missing');
  assert.ok(testUser.user.password, 'Password is missing');
  assert.ok(testUser.user.username, 'Username is missing');
});

test('setupContext returns an object with userData', () => {
  const context = setupContext();
  assert.ok(context.userData, 'userData is missing in context');
});
