/**
 * @module app.mongoose
 * @description Mongoose (MongoDB) Configuration File
 *
 * @requires mongoose
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const mongoose = require('mongoose');
const winston = require('./winston');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
};
mongoose.connect(process.env.MONGO_APP_URL, options);
mongoose.set('autoIndex', false);

const db = mongoose.connection;

db.on('error', (err) => {
  winston.error(new Error('Reclamation Server | MongoDB | Could not connect to database'), err);
});
db.once('open', (data) => {
  winston.info('Reclamation Server | MongoDB | Database Connected', data);
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
