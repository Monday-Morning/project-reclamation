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
   * @param {Object} additional Custom Error Data
   * @returns {Object}
   */
  APIError: (code, errorObject = null, additional = null) =>
    new Object({
      code,
      message: HttpResponseConstants[code].message,
      additional,
      error: errorObject,
    }),

  /**
   * Creates a GraphQLError and returns it
   * @param {String} code String Error Code
   * @param {Error} errorObject Error Object
   * @param {Object} additional Custom Error Data
   * @returns {GraphQLError}
   */
  GraphQLError: (code, errorObject = null, additional = null) =>
    new GraphQLError(code, null, null, null, null, errorObject, {
      ...HttpResponseConstants[code],
      additional,
    }),
};
