const CORS = require('cors');
const logger = require('../utils/logger')('CORS');

const CORS_OPTIONS = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || origin.match(new RegExp(Buffer.from(process.env.CORS_ORIGIN_REGEX, 'base64').toString()))) {
      return callback(null, true);
    }
    logger.warn(`CORS blocked a request from ${origin}`);
    return callback(new Error('Request blocked by CORS. Invalid source!'));
  },
};

module.exports = { cors: CORS(CORS_OPTIONS), CORS_OPTIONS };
