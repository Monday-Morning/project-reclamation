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
const fs = require('fs');

module.exports = {
  /**
   * @description Firebase Initialization Sequence
   * @function
   */
  init: () => {
    const firebaseServiceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('ascii')
    );

    if (!fs.existsSync('firebaseServiceAccount.json')) {
      fs.writeFileSync('firebaseServiceAccount.json', JSON.stringify(firebaseServiceAccount));
    }

    try {
      /** Inititalize Firebase Admin SDK with required configuration */
      if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.NODE_ENV !== 'development') {
        Admin.initializeApp({
          credential: Admin.credential.cert(firebaseServiceAccount),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || null,
        });
        logger.info(
          `Admin Application Initialized: ${
            process.env.NODE_ENV === 'production' ? 'Production' : 'Staging'
          } Environment`
        );
      } else if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
        Admin.initializeApp({ projectId: process.env.GCLOUD_PROJECT });
        logger.info('Admin Application Initialized: Emulated Environment');
      } else {
        logger.info('No Admin App: Development Environment');
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
