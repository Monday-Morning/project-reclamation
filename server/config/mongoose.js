/**
 * @module app.mongoose
 * @description Mongoose (MongoDB) Configuration File
 *
 * @requires mongoose
 * @requires module:app.winston
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Mongoose = require('mongoose');
const logger = require('../utils/logger')('mongoose');

module.exports = {
  /**
   * @description Mongoose Initialization Sequence
   * @function
   */
  init: () => {
    const MONGOOSE_OPTIONS = {
      maxPoolSize: 100,
      minPoolSize: 10,
    };
    Mongoose.connect(process.env.MONGO_APP_URL, MONGOOSE_OPTIONS)
      .then(() => logger.info('Database Connected'))
      .catch((err) => logger.error('Could not connect to database: ', err));
  },

  /**
   * @description Mongoose Database Connection
   * @constant
   *
   * @type {Mongoose.Connection}
   */
  connection: Mongoose.connection.readyState !== 1 ? Mongoose.connection : null,

  /**
   * @description Mongoose Library (Initialized)
   * @constant
   *
   * @type {Mongoose.Mongoose}
   */
  Mongoose,

  close: () => (Mongoose.connection.readyState !== 1 ? Mongoose.connection.close(false) : true),
};
