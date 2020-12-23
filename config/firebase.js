const admin = require('firebase-admin');
const firebaseServiceAccount = require('./firebase-service-account.json');
const winston = require('./winston');

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    storageBucket: process.env.GCP_STORAGE_BUCKET,
  });
  winston.info('Reclamation Server | Firebase | Admin Application Initialized');
} catch (e) {
  winston.error(new Error('Reclamation Server | Firebase | Could not initialize admin application'), e);
  return;
}

const auth = admin.auth();
const bucket = admin.storage().bucket();
module.exports = { auth, bucket };
