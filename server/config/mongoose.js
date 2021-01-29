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
const Winston = require('../helpers/winston');
const logger = new Winston('mongoose');

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
  useCreateIndex: true,
};
Mongoose.connect(process.env.MONGO_APP_URL, MONGOOSE_OPTIONS);

const db = Mongoose.connection;

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
   * @type {Mongoose.Connection}
   */
  db,

  /**
   * @description Mongoose Library (Initialized)
   * @constant
   *
   * @type {Mongoose.Mongoose}
   */
  Mongoose,
};
