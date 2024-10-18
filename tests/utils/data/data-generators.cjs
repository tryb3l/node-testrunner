'use strict';
const { generateKey } = require('../crypto/crypto.cjs');

/**
 * Date formats.
 */
const DateFormat = {
  ISO: 'iso',
  UTC: 'utc',
};

/**
 * Generates a random date between two dates and formats it.
 * @param {Date} [start=new Date()] - The start date. Defaults to the current date.
 * @param {Date} [end=new Date(new Date().setFullYear(new Date().getFullYear() + 1))] - The end date. Defaults to one year from the current date.
 * @param {string} [formatType=DateFormat.ISO] - The format of the returned date. Defaults to ISO 8601 format.
 * @returns {string} The generated date.
 * @throws {Error} If the format type is invalid.
 */
function randomDate(
  start = new Date(),
  end = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  formatType = DateFormat.ISO
) {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const date = new Date(randomTime);

  const formatters = {
    [DateFormat.ISO]: date.toISOString.bind(date),
    [DateFormat.UTC]: date.toUTCString.bind(date),
  };

  const formatter = formatters[formatType];
  if (!formatter) {
    throw new Error(`Invalid format: ${formatType}`);
  }

  return formatter();
}

function randomUsername(usernamelength = 8) {
  return generateKey(
    usernamelength,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
}

function randomEmail(usernameLength = 5, domainLength = 5) {
  return `${generateKey(
    usernameLength,
    'abcdefghijklmnopqrstuvwxyz'
  )}@${generateKey(domainLength, 'abcdefghijklmnopqrstuvwxyz')}.com`;
}

function randomPassword(length = 12) {
  return generateKey(
    length,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
}

function randomString(
  input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  length = 20
) {
  const defaultSymbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const allowedSymbols = typeof input === 'string' ? input : defaultSymbols;
  const finalLength = typeof input === 'number' ? input : length;

  return generateKey(finalLength, allowedSymbols);
}

function randomStringWithPrefix(
  prefix = '',
  allowedSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  length = 20
) {
  const randomStr = generateKey(length, allowedSymbols);
  return prefix + randomStr;
}

module.exports = {
  randomDate,
  randomUsername,
  randomEmail,
  randomPassword,
  randomString,
  randomStringWithPrefix,
};
