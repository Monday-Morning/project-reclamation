const RoleModel = require('../../schema/role/role.model');
const logger = require('../logger')('utils.auth');
const fs = require('fs');
const { APIError } = require('../exception');
let rolesCacheFile = './roles.json';

const UserRole = {
  /**
   * @description Retrieves and caches all roles locally
   * @function
   * @async
   *
   * @param {RoleModel} _RoleModel
   * @returns {NULL | GraphQLError} roles
   */
  cache: async (_RoleModel = RoleModel) => {
    try {
      const _roles = await _RoleModel.find({}, 'name permissions section', { lean: true });
      // Write the roles to a file for caching with proper formatting
      fs.writeFileSync('./roles.json', JSON.stringify(_roles, null, 2));
      rolesCacheFile = fs.realpathSync('./roles.json');
      return rolesCacheFile;
    } catch (error) {
      logger.error('The server could not update the roles cache.', error);
      throw APIError(null, error, { reason: 'The server could not update the roles cache.' });
    }
  },

  /**
   * @description Retrieves all roles
   * @function
   *
   * @returns {Array<Object> | GraphQLError}
   */
  get: () => {
    try {
      if (rolesCacheFile === './roles.json') {
        rolesCacheFile = fs.realpathSync('./server/roles.json');
      }
      return JSON.parse(fs.readFileSync(rolesCacheFile));
    } catch (error) {
      logger.error('The server could not read the roles cache.', error);
      throw APIError(null, error, { reason: 'The server could not read the roles cache.' });
    }
  },
};

module.exports = UserRole;
