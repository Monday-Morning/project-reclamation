const CORS = require('cors');
const logger = require('../utils/logger')('CORS');

const ORIGIN_PATTERS = {
  // Allows localhost, Apollo Studio
  development: new RegExp(/^https?:\/\/((127\.0\.0\.1|localhost)(:\d{1,})?|studio\.apollographql\.com)$/),

  // Allows localhost, Apollo Studio, DashNet MM Domains, NITR MM Domains, Render Staging Domains and PR Review Apps
  staging: new RegExp(
    /^https?:\/\/((127\.0\.0\.1|localhost)(:\d{1,})?|studio\.apollographql\.com|mm(\.server1)?\.dashnet\.in|mondaymorning\.nitrkl\.ac\.in|project-(reclamation|tahiti)-staging\.onrender\.com)$/
  ),

  // Allows Apollo Studio, DashNet MM Domains, and NITR MM Domains
  // Does not allow localhost, Render Staging Domains and PR Review Apps
  production: new RegExp(
    /^https?:\/\/(studio\.apollographql\.com|mm(\.server1)?\.dashnet\.in|mondaymorning\.nitrkl\.ac\.in)$/
  ),
};

const CORS_OPTIONS = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || origin.match(ORIGIN_PATTERS[process.env.NODE_ENV || 'production'])) {
      return callback(null, true);
    }
    logger.warn(`CORS blocked a request from ${origin}`);
    return callback(new Error('Request blocked by CORS. Invalid source!'));
  },
};

module.exports = { cors: CORS(CORS_OPTIONS), CORS_OPTIONS, ORIGIN_PATTERS };
