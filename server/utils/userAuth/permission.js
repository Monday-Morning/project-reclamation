const UserRole = require('./role');
const UserSession = require('./session');
const { APIError } = require('../exception');

const UserPermission = {
  /**
   * @description Retrieves all the permissions of a role
   * @function
   *
   * @returns {Array<String>}
   */
  get: (roleName) => {
    try {
      const _roles = UserRole.get();
      return _roles.find((x) => x.name === roleName).permissions;
    } catch (error) {
      throw APIError(null, error, { reason: 'The server could not read the permissions.' });
    }
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
  exists: (session, authToken, decodedToken, permission) => {
    try {
      if (!UserSession.valid(session, authToken)) {
        return false;
      }
      const _roles = UserRole.get();
      if (
        !decodedToken ||
        !decodedToken.roles ||
        !(decodedToken.roles instanceof Array) ||
        decodedToken.roles.length <= 0
      ) {
        return false;
      }
      const _permissions = decodedToken.roles
        .map((x) => _roles.find((y) => y.name === x).permissions)
        .reduce((prev, curr) => [...prev, ...curr]);
      if (!_permissions.includes(permission)) {
        return false;
      }
      return true;
    } catch (error) {
      throw APIError(null, error, { reason: 'The server could not check for a permission.' });
    }
  },
};

module.exports = UserPermission;
