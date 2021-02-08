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
const firebaseServiceAccount = require('./firebase-service-account.json');
const Winston = require('../helpers/winston');
const logger = new Winston('firebase');

module.exports = {
  /**
   * @description Firebase Initialization Sequence
   * @function
   */
  init: () => {
    try {
      /** Inititalize Firebase Admin SDK with required configuration */
      Admin.initializeApp({
        credential: Admin.credential.cert(firebaseServiceAccount),
        storageBucket: process.env.GCP_STORAGE_BUCKET || null,
      });
      logger.info('Admin Application Initialized');
    } catch (e) {
      logger.error('Could not initialize admin application', e);
    }
  },

  /**
   * @description Firebase Authentication Library
   * @constant
   *
   * @type {Admin.auth.Auth}
   */
  auth: Admin.apps.length > 0 ? Admin.auth() : null,

  /**
   * @description Firebase Storage Library
   * @constant
   *
   * @type {Admin.storage}
   */
  bucket: Admin.apps.length > 0 ? Admin.storage().bucket() : null,
};
