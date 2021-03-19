/**
 * @module app.error.httpErrorCodes
 * @description HTTP Error Codes
 *
 * @version 0.1.0
 * @since 0.1.0
 */

module.exports = {
  /**
   * @constant OK
   * @description The request has succeeded.
   */
  OK: {
    code: 200,
    message: 'The request has succeeded.',
  },
  /**
   * @constant BAD_REQUEST
   * @description The server could not understand the request due to invalid syntax || The server could not process the request due to missing query fields
   */
  BAD_REQUEST: {
    code: 400,
    message: 'The server could not process the request due to missing query fields.',
  },
  /**
   * @constant UNAUTHORIZED
   * @description Unauthenticated request.
   */
  UNAUTHORIZED: {
    code: 401,
    message: 'This request is unauthorized. Your request may be missing a valid authorization token.',
  },
  /**
   * @constant FORBIDDEN
   * @description The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server.
   */
  FORBIDDEN: {
    code: 403,
    message:
      "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server.",
  },
  /**
   * @constant NOT_FOUND
   * @description The server can not find the requested resource. This means that the endpoint is invalid and the resource does not exist.
   */
  NOT_FOUND: {
    code: 404,
    message:
      'The server can not find the requested resource. This means that the endpoint is invalid and the resource does not exist.',
  },
  /**
   * @constant METHOD_NOT_ALLOWED
   * @description The request method is known by the server but has been disabled and cannot be used.
   */
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: 'The request method is known by the server but has been disabled and cannot be used.',
  },
  /**
   * @constant TOO_MANY_REQUESTS
   * @description The user has sent too many requests in a given amount of time ("rate limiting").
   */
  TOO_MANY_REQUESTS: {
    code: 429,
    message: 'The user has sent too many requests in a given amount of time ("rate limiting").',
  },
  /**
   * @constant INTERNAL_SERVER_ERROR
   * @description The server has encountered a situation it doesn't know how to handle.
   */
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "The server has encountered a situation it doesn't know how to handle.",
  },
};
