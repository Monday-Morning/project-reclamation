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
const mongoose = require('mongoose');
const winston = require('../helpers/winston');
const logger = new winston('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGO_APP_URL, options);

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error('Could not connect to database', err);
});
db.once('open', (data) => {
  logger.info('Database Connected', data);
});

module.exports = {
  /**
   * @description Mongoose Database Connection
   * @constant
   *
   * @type {mongoose.Connection}
   */
  db,

  /**
   * @description Mongoose Library (Initialized)
   * @constant
   *
   * @type {mongoose.Mongoose}
   */
  mongoose,
};
