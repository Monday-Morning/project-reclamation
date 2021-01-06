/**
 * @module app.models
 * @description MongoDB Models
 *
 * @requires module:app.models.user
 * @requires module:app.models.role
 *
 * @version 0.1.0
 * @since 0.1.0
 */

module.exports = {
  /**
   * @description User Model
   * @constant
   *
   * @see module:app.models.user
   */
  UserModel: require('./user'),

  /**
   * @description Role Model
   * @constant
   *
   * @see module:app.models.role
   */
  RoleModel: require('./role'),
};
