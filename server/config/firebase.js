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
      const firebaseServiceAccount = {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_KEY_ID,
        private_key: process.env.FIREBASE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
          'https://www.googleapis.com/robot/v1/metadata/x509/' + encodeURI(process.env.FIREBASE_CLIENT_EMAIL),
      };
      if (process.env.FIREBASE_PROJECT_ID) {
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
};
