/**
 * @module app.firebase.auth.errorCodes
 * @description Firebase Auth Error Codes
 *
 * @todo Rewrite messages to make them user safe
 *
 * @version 0.1.0
 * @since 0.1.0
 */

//TODO: rewerite all messages to make them user safe
module.exports = {
  'auth/claims-too-large': {
    code: 500,
    message: 'The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.',
  },
  'auth/email-already-exists': {
    code: 500,
    message: 'The provided email is already in use by an existing user. Each user must have a unique email.',
  },
  'auth/id-token-expired': { code: 500, message: 'The provided Firebase ID token is expired.' },
  'auth/id-token-revoked': { code: 500, message: 'The Firebase ID token has been revoked.' },
  'auth/insufficient-permission': {
    code: 500,
    message:
      'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.',
  },
  'auth/internal-error': {
    code: 500,
    message:
      'The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.',
  },
  'auth/invalid-argument': {
    code: 500,
    message:
      'An invalid argument was provided to an Authentication method. The error message should contain additional information.',
  },
  'auth/invalid-claims': {
    code: 500,
    message: 'The custom claim attributes provided to setCustomUserClaims() are invalid.',
  },
  'auth/invalid-continue-uri': { code: 500, message: 'The continue URL must be a valid URL string.' },
  'auth/invalid-creation-time': { code: 500, message: 'The creation time must be a valid UTC date string.' },
  'auth/invalid-credential': {
    code: 500,
    message:
      'The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential.',
  },
  'auth/invalid-disabled-field': {
    code: 500,
    message: 'The provided value for the disabled user property is invalid. It must be a boolean.',
  },
  'auth/invalid-display-name': {
    code: 500,
    message: 'The provided value for the displayName user property is invalid. It must be a non-empty string.',
  },
  'auth/invalid-dynamic-link-domain': {
    code: 500,
    message: 'The provided dynamic link domain is not configured or authorized for the current project.',
  },
  'auth/invalid-email': {
    code: 500,
    message: 'The provided value for the email user property is invalid. It must be a string email address.',
  },
  'auth/invalid-email-verified': {
    code: 500,
    message: 'The provided value for the emailVerified user property is invalid. It must be a boolean.',
  },
  'auth/invalid-hash-algorithm': {
    code: 500,
    message: 'The hash algorithm must match one of the strings in the list of supported algorithms.',
  },
  'auth/invalid-hash-block-size': { code: 500, message: 'The hash block size must be a valid number.' },
  'auth/invalid-hash-derived-key-length': { code: 500, message: 'The hash derived key length must be a valid number.' },
  'auth/invalid-hash-key': { code: 500, message: 'The hash key must a valid byte buffer.' },
  'auth/invalid-hash-memory-cost': { code: 500, message: 'The hash memory cost must be a valid number.' },
  'auth/invalid-hash-parallelization': { code: 500, message: 'The hash parallelization must be a valid number.' },
  'auth/invalid-hash-rounds': { code: 500, message: 'The hash rounds must be a valid number.' },
  'auth/invalid-hash-salt-separator': {
    code: 500,
    message: 'The hashing algorithm salt separator field must be a valid byte buffer.',
  },
  'auth/invalid-id-token': { code: 500, message: 'The provided ID token is not a valid Firebase ID token.' },
  'auth/invalid-last-sign-in-time': { code: 500, message: 'The last sign-in time must be a valid UTC date string.' },
  'auth/invalid-page-token': {
    code: 500,
    message: 'The provided next page token in listUsers() is invalid. It must be a valid non-empty string.',
  },
  'auth/invalid-password': {
    code: 500,
    message:
      'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  },
  'auth/invalid-password-hash': { code: 500, message: 'The password hash must be a valid byte buffer.' },
  'auth/invalid-password-salt': { code: 500, message: 'The password salt must be a valid byte buffer' },
  'auth/invalid-phone-number': {
    code: 500,
    message:
      'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.',
  },
  'auth/invalid-photo-url': {
    code: 500,
    message: 'The provided value for the photoURL user property is invalid. It must be a string URL.',
  },
  'auth/invalid-provider-data': { code: 500, message: 'The providerData must be a valid array of UserInfo objects.' },
  'auth/invalid-provider-id': {
    code: 500,
    message: 'The providerId must be a valid supported provider identifier string.',
  },
  'auth/invalid-session-cookie-duration': {
    code: 500,
    message: 'The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.',
  },
  'auth/invalid-uid': {
    code: 500,
    message: 'The provided uid must be a non-empty string with at most 128 characters.',
  },
  'auth/invalid-user-import': { code: 500, message: 'The user record to import is invalid.' },
  'auth/maximum-user-count-exceeded': {
    code: 500,
    message: 'The maximum allowed number of users to import has been exceeded.',
  },
  'auth/missing-android-pkg-name': {
    code: 500,
    message: 'An Android Package Name must be provided if the Android App is required to be installed.',
  },
  'auth/missing-continue-uri': { code: 500, message: 'A valid continue URL must be provided in the request.' },
  'auth/missing-hash-algorithm': {
    code: 500,
    message: 'Importing users with password hashes requires that the hashing algorithm and its parameters be provided.',
  },
  'auth/missing-ios-bundle-id': { code: 500, message: 'The request is missing an iOS Bundle ID.' },
  'auth/missing-uid': { code: 500, message: 'A uid identifier is required for the current operation.' },
  'auth/operation-not-allowed': {
    code: 500,
    message:
      'The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.',
  },
  'auth/phone-number-already-exists': {
    code: 500,
    message:
      'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
  },
  'auth/project-not-found': {
    code: 500,
    message:
      'No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.',
  },
  'auth/reserved-claims': {
    code: 500,
    message:
      'One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.',
  },
  'auth/session-cookie-expired': { code: 500, message: 'The provided Firebase session cookie is expired.' },
  'auth/session-cookie-revoked': { code: 500, message: 'The Firebase session cookie has been revoked.' },
  'auth/uid-already-exists': {
    code: 500,
    message: 'The provided uid is already in use by an existing user. Each user must have a unique uid.',
  },
  'auth/unauthorized-continue-uri': {
    code: 500,
    message: 'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.',
  },
  'auth/user-not-found': {
    code: 500,
    message: 'There is no existing user record corresponding to the provided identifier.',
  },
};
