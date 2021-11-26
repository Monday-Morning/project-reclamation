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
      const firebaseServiceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii')
      );
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        Admin.initializeApp({
          credential: Admin.credential.cert(firebaseServiceAccount),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || null,
        });
        logger.info('Admin Application Initialized');
      } else {
        logger.info('No Admin App - Development Environment');
      }
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

  close: () => Promise.all(Admin.apps.map((app) => app.delete())),
};
