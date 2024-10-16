'use strict';
const assert = require('node:assert');
const {
  randomDate,
  randomEmail,
  randomPassword,
  randomString,
  randomStringWithPrefix,
  randomUsername,
} = require('../utils/data-creator.cjs');
const { test } = require('node:test');

test('randomEmail generates a valid email address', () => {
  const email = randomEmail();
  assert.match(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid');
});

test('randomPassword generates a string of correct length', () => {
  const length = 16;
  const password = randomPassword(length);
  assert.strictEqual(password.length, length, 'Password length is incorrect');
});

test('randomUsername generates a string of correct length', () => {
  const length = 12;
  const username = randomUsername(length);
  assert.strictEqual(username.length, length, 'Username length is incorrect');
});

test('randomString generates a string of correct length', () => {
  const length = 20;
  const str = randomString(undefined, length);
  assert.strictEqual(str.length, length, 'String length is incorrect');
});

test('randomStringWithPrefix generates a string with the correct prefix', () => {
  const prefix = 'test_';
  const length = 10;
  const str = randomStringWithPrefix(prefix, undefined, length);
  assert.ok(str.startsWith(prefix), 'String does not start with the prefix');
  assert.strictEqual(
    str.length,
    prefix.length + length,
    'String length including prefix is incorrect'
  );
});

test('randomDate generates a date within the specified range', () => {
  const start = new Date('2023-01-01');
  const end = new Date('2023-12-31');
  const dateStr = randomDate(start, end);
  const date = new Date(dateStr);
  assert.ok(date >= start && date <= end, 'Date is out of range');
});
