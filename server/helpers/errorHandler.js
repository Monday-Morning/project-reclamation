/**
 * @module app.error
 * @description HTTP Response Constants
 *
 * @requires graphql
 * @requires module:app.error.httpsResponseConstants
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const { GraphQLError } = require('graphql');
const FirebaseAuthErrorCodes = require('./firebaseAuthErrorCodes');
const HttpErrorCodes = require('./httpErrorCodes');

module.exports = {
  GraphQLError,

  /**
   * @description Creates a GraphQLError and returns it
   * @function
   *
   * @param {String} code String Error Code
   * @param {Error} error Error Object
   * @param {Object} additional Custom Error Data
   * @returns {GraphQLError}
   */
  APIError: (code = 'INTERNAL_SERVER_ERROR', error = null, additional = null) =>
    new GraphQLError(code, null, null, null, null, error, {
      ...HttpErrorCodes[code],
      additional,
    }),

  /**
   * @description Handles Firebase Auth Errors and return a GraphQLError Object
   *
   * @param {Admin.auth.Auth.Error} error Error Object
   * @param {Object} additional Custom Error Data
   * @returns {GraphQLError}
   */
  FirebaseAuthError: (error, additional = null) =>
    new GraphQLError(error.code, null, null, null, null, error, {
      ...FirebaseAuthErrorCodes[error.code],
      additional,
    }),
};
