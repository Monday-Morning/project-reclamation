/**
 * @module app.models
 * @description MongoDB Models
 *
 * @requires module:app.models.user
 * @requires module:app.models.role
 * @requires module:app.models.club
 * @requires module:app.models.event
 * @requires module:app.models.categoryMap
 * @requires module:app.models.tag
 * @requires module:app.models.media
 * @requires module:app.models.album
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

  /**
   * @description Club Model
   * @constant
   *
   * @see module:app.models.club
   */
  ClubModel: require('./club'),

  /**
   * @description Event Model
   * @constant
   *
   * @see module:app.models.event
   */
  EventModel: require('./event'),

  /**
   * @description Category Map Model
   * @constant
   *
   * @see module:app.models.categoryMap
   */
  CategoryMapModel: require('./categoryMap'),

  /**
   * @description Tag Model
   * @constant
   *
   * @see module:app.models.tag
   */
  TagModel: require('./tag'),

  /**
   * @description Media Model
   * @constant
   *
   * @see module:app.models.media
   */
  MediaModel: require('./media'),

  /**
   * @description Album Model
   * @constant
   *
   * @see module:app.models.album
   */
  AlbumModel: require('./album'),
};
