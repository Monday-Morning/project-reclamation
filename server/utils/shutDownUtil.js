const logger = require('./logger')('Shut Down');
const { close: firebaseClose } = require('../config/firebase');
const { close: mongooseClose } = require('../config/mongoose');
const { close: nodemailerClose } = require('../config/nodemailer');

module.exports = (type, server, apolloApp) => {
  logger.info(`Received ${type}.`);
  logger.info('Shutting down servers...');
  return server.close(() => {
    logger.info('Express Server Shutdown.');
    return apolloApp
      .stop()
      .then(() => {
        logger.info('Apollo Server Shutdown.');
        logger.info('Shutting down connections...');
        return firebaseClose();
      })
      .then(() => {
        logger.info('Firebase Connection Closed.');
        return mongooseClose();
      })
      .then(() => {
        logger.info('Mongoose Connection Closed.');
        return nodemailerClose();
      })
      .then(() => {
        logger.info('Nodemailer Transport Closed.');
        logger.info('Exiting successfully.');
        process.exit(0);
      })
      .catch((error) => {
        logger.error('Could not close all connections.', error);
        process.exit(1);
      });
  });
};
