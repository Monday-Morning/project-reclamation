const { GraphQLError } = require('graphql');
const AuthErrorCodes = require('./authErrorCodes');
const HttpErrorCodes = require('./httpErrorCodes');

const Exception = {
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
  APIError: (code = 'INTERNAL_SERVER_ERROR', error = null, additional = null) => {
    if (error instanceof GraphQLError) {
      return error;
    }
    return new GraphQLError(code, null, null, null, null, error, {
      ...HttpErrorCodes[code],
      additional,
    });
  },

  /**
   * @description Handles Firebase Auth Errors and return a GraphQLError Object
   *
   * @param {Admin.auth.Auth.Error} error Error Object
   * @param {Object} additional Custom Error Data
   * @returns {GraphQLError}
   */
  FirebaseAuthError: (error, additional = null) => {
    if (error instanceof GraphQLError) {
      return error;
    }
    if (error && error.code && error.code.toString().substring(0, 4) === 'auth') {
      return new GraphQLError(error.code, null, null, null, null, error, {
        ...AuthErrorCodes[error.code],
        additional,
      });
    }
    return new GraphQLError('INTERNAL_SERVER_ERROR', null, null, null, null, error, {
      ...HttpErrorCodes.INTERNAL_SERVER_ERROR,
      additional,
    });
  },
};

module.exports = Exception;
