'use strict';
const assert = require('node:assert');
const { createRequestOptions } = require('../utils/http/http-utils.cjs');
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
