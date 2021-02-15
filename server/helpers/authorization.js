/**
 * @module app.authorization
 * @description Authentication State, Roles and Permissions Handler
 *
 * @requires module:app.firebase
 * @requires module:app.mongoose
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const RoleModel = require('../schema/role/role.model');
const { auth } = require('../config/firebase');
const { APIError, FirebaseAuthError, GraphQLError } = require('./errorHandler');
const fs = require('fs');
const Winston = require('./winston');
const logger = new Winston('authorization');
const S_TO_MS = 1000;

const Authorization = {
  /**
   * @description Authenticates a user and returns the uid
   * @function
   * @async
   *
   * @param {String} jwt JSON Web Token
   * @param {auth} _auth Firebase Authentication Library
   * @returns {Object | GraphQLError} decodedToken
   */
  AuthenticateUser: async (jwt, _auth = auth) => {
    try {
      const decodedToken = await _auth.verifyIdToken(jwt, true);

      if (!decodedToken.email_verified) {
        return APIError('UNAUTHORIZED', null, {
          message: 'The users email id is not verified.',
        });
      }

      return decodedToken;
    } catch (e) {
      return FirebaseAuthError(e);
    }
  },

  /**
   * @description Checks if user's session is active and valid
   * @function
   *
   * @param {session.Session} session
   * @param {String} jwt
   * @returns {Boolean}
   */
  CheckSession: (session, jwt) =>
    !session ||
    !session.auth ||
    !session.auth.jwt ||
    !session.auth.exp ||
    !session.auth.roles ||
    session.auth.jwt !== jwt ||
    session.auth.exp <= Date.now() / S_TO_MS
      ? false
      : true,

  /**
   * @description Creates a session for a user and authenticates the user
   * @function
   * @async
   *
   * @param {session.Session} session
   * @param {String} jwt
   * @param {auth} _auth Firebase Authentication Library
   * @returns {Object | GraphQLError} decodedToken
   */
  StartSession: async (session, jwt, _auth = auth) => {
    try {
      const decodedToken = await Authorization.AuthenticateUser(jwt, _auth);
      if (decodedToken instanceof GraphQLError) {
        return decodedToken;
      }
      const {
        uid,
        exp,
        customClaims: { roles, mid },
      } = decodedToken;
      session.auth = {
        uid,
        mid,
        jwt,
        exp,
        roles,
      };
      await session.save();
      return decodedToken;
    } catch (e) {
      return APIError(null, e, null);
    }
  },

  /**
   * @description Ends the running session
   * @function
   * @async
   *
   * @param {session.Session} session
   * @param {String} jwt
   * @returns {NULL | GraphQLError}
   */
  EndSession: async (session, jwt) => {
    try {
      if (Authorization.CheckSession(session, jwt)) {
        await session.destroy();
        return true;
      }
      return false;
    } catch (e) {
      return APIError(null, e, { message: 'Could not destroy users session.' });
    }
  },

  /**
   * @description Retrieves and caches all roles locally
   * @function
   * @async
   *
   * @param {RoleModel} _RoleModel
   * @returns {NULL | GraphQLError} roles
   */
  CacheRoles: async (_RoleModel = RoleModel) => {
    try {
      const _roles = await _RoleModel.find({}, ['name', 'permissions'], { lean: true });
      return fs.writeFileSync('./roles.json', _roles.toString());
    } catch (e) {
      logger.error('Could not update roles cache.', e);
      return APIError(null, e, { message: 'Could not update roles cache.' });
    }
  },

  /**
   * @description Retrieves all roles
   * @function
   *
   * @returns {Array<Object> | GraphQLError}
   */
  GetRoles: () => {
    try {
      return fs.readFileSync('./roles.json');
    } catch (e) {
      logger.error('Could not read roles cache.', e);
      return APIError(null, e, { message: 'Could not read roles cache' });
    }
  },

  /**
   * @description Retrieves all the permissions of a role
   * @function
   *
   * @returns {Array<String>}
   */
  GetPermissions: (roleName) => {
    const _roles = Authorization.GetRoles();
    if (_roles instanceof GraphQLError) {
      return _roles;
    }
    return _roles.find((x) => x.name === roleName).permissions;
  },

  /**
   * @description Checks if the user has a particular permission
   * @function
   *
   * @param {Object} session
   * @param {String} jwt
   * @param {String} permission
   * @returns {Boolean | GraphQLError}
   */
  HasPermmission: (session, jwt, permission) => {
    if (!Authorization.CheckSession(session, jwt)) {
      session.destroy();
      return APIError('UNAUTHORIZED', null, {
        message: 'The users session has either expired or is invaid. Please regenerate the session.',
      });
    }
    const _roles = Authorization.GetRoles();
    if (_roles instanceof GraphQLError) {
      return _roles;
    }
    const UserPermissions = session.roles.map((x) => _roles.find((y) => y.name === x));
    if (!UserPermissions.contains(permission)) {
      return false;
    }
    return true;
  },

  /**
   * @description Parses the auth status
   * @function
   *
   * @param {String} jwt
   * @returns {NULL | Object | GraphQLError}
   */
  GetUserAuthScope: (session, jwt, _auth = auth) => {
    if (!jwt) {
      return null;
    }
    if (Authorization.CheckSession(session, jwt)) {
      return session.auth.roles;
    }
    return Authorization.StartSession(session, jwt, _auth);
  },
};

module.exports = Authorization;
