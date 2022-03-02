const CORS = require('cors');
const logger = require('../utils/logger')('CORS');

const ORIGIN_PATTERS = {
  // Allows localhost and Apollo Studio
  development: new RegExp(
    /^https?:\/\/((127\.0\.0\.1|localhost)(:\d{1,})?|studio\.apollographql\.com|project-reclamation-pr-\d{0,}\.herokuapp\.com)$/
  ),

  // Allows localhost, Apollo Studio, Firebase Project Domains, DashNet MM Domains, and NITR MM Domains
  staging: new RegExp(
    /^https?:\/\/((127\.0\.0\.1|localhost)(:\d{1,})?|studio\.apollographql\.com|project-infinity-98561(.{0,}\.)(web\.app|firebaseapp\.com)|mm(\.server1)?.dashnet.in|(mm|mondaymorning)\.nitrkl(\.ac)?\.in|project-reclamation-staging\.herokuapp\.com)$/
  ),

  // Allows Apollo Studio, Firebase Project Domains, DashNet MM Domains, and NITR MM Domains
  // Does not allow localhost
  production: new RegExp(
    /^https?:\/\/(studio\.apollographql\.com|project-infinity-98561(.{0,}\.)(web\.app|firebaseapp\.com)|mm(\.server1)?.dashnet.in|(mm|mondaymorning)\.nitrkl(\.ac)?\.in)$/
  ),
};

const CORS_OPTIONS = {
  credentials: true,
  origin(origin, callback) {
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (origin?.match(ORIGIN_PATTERS[process.env.NODE_ENV || 'production'])) {
      return callback(null, true);
    }
    logger.warn(`CORS blocked a request from ${origin}`);
    return callback(new Error('Request blocked by CORS. Invalid source!'));
  },
};

module.exports = { cors: CORS(CORS_OPTIONS), CORS_OPTIONS, ORIGIN_PATTERS };
