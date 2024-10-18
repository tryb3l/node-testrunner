'use strict';

function createRequestOptions(method, body) {
  return {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

function createAuthorizedRequestOptions(method, body, token) {
  const options = createRequestOptions(method, body);
  options.headers.Authorization = `Token ${token}`;
  return options;
}

module.exports = {
  createRequestOptions,
  createAuthorizedRequestOptions,
};
