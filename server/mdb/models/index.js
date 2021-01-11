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
 * @requires module:app.models.article
 * @requires module:app.models.comment
 * @requires module:app.models.reaction
 * @requires module:app.models.issue
 * @requires module:app.models.mmSession
 * @requires module:app.models.squiggle
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

  /**
   * @description Article Model
   * @constant
   *
   * @see module:app.models.article
   */
  ArticleModel: require('./article'),

  /**
   * @description Comment Model
   * @constant
   *
   * @see module:app.models.comment
   */
  CommentModel: require('./comment'),

  /**
   * @description Reaction Model
   * @constant
   *
   * @see module:app.models.reaction
   */
  ReactionModel: require('./reaction'),

  /**
   * @description Issue Model
   * @constant
   *
   * @see module:app.models.issue
   */
  IssueModel: require('./issue'),

  /**
   * @description MMSession Model
   * @constant
   *
   * @see module:app.models.mmSession
   */
  MMSessionModel: require('./mmSession'),

  /**
   * @description Squiggle Model
   * @constant
   *
   * @see module:app.models.squiggle
   */
  SquiggleModel: require('./squiggle'),
};
