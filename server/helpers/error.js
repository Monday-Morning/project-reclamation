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
const HttpResponseConstants = require('./httpResponseConstants');

module.exports = {
  /**
   * Creates an Error Object and returns it
   * @param {String} code String Error Code
   * @param {Error} errorObject Error Object
   * @param {Object} errorData Custom Error Data
   * @returns {Object}
   */
  APIError: (code, errorObject = null, errorData = HttpResponseConstants[code]) =>
    new Object({ code, message: errorObject ? errorObject.message : errorData.message, error: errorObject }),

  /**
   * Creates a GraphQLError and returns it
   * @param {String} code String Error Code
   * @param {Error} errorObject Error Object
   * @param {Object} errorData Custom Error Data
   * @returns {GraphQLError}
   */
  GraphQLError: (code, errorObject = null, errorData = HttpResponseConstants[code]) =>
    new GraphQLError(code, null, null, null, null, errorObject, errorData),
};
