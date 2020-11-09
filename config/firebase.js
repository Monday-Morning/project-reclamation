const admin = require('firebase-admin');
const firebaseServiceAccount = JSON.stringify({
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_ID,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
});

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    storageBucket: process.env.GCP_STORAGE_BUCKET,
  });
  console.info('Reclamation Server | Firebase | Admin Application Initialized');
} catch (e) {
  console.error(new Error('Reclamation Server | Firebase | Could not initialize admin application'), e);
  return;
}

const auth = admin.auth();
const bucket = admin.storage().bucket();
module.exports = { auth, bucket };
