'use strict';
require('dotenv').config();

/**
 * Retrieves the environment variables used in tests.
 */
const env = {
  conduitAPI: process.env.CONDUIT_API,
};

module.exports = { env };
