/**
 * @module app.firebase
 * @description Firebase Confguration file
 *
 * @requires firebase-admin
 * @requires module:app.winston
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const Admin = require('firebase-admin');
const logger = require('../utils/logger')('firebase');

module.exports = {
  /**
   * @description Firebase Initialization Sequence
   * @function
   */
  init: () => {
    try {
      /** Inititalize Firebase Admin SDK with required configuration */
      const firebaseServiceAccount = require('./firebase-service-account.json');
      Admin.initializeApp({
        credential: Admin.credential.cert(firebaseServiceAccount),
        storageBucket: process.env.GCP_STORAGE_BUCKET || null,
      });
      logger.info('Admin Application Initialized');
    } catch (e) {
      logger.error('Could not initialize admin application: ', e);
    }
  },

  /**
   * @description Firebase Admin API
   * @constant
   *
   * @type {Admin}
   */
  admin: Admin,
};
