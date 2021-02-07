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
 * @requires module:app.models.session
 * @requires module:app.models.squiggle
 * @requires module:app.models.company
 * @requires module:app.models.live
 * @requires module:app.models.shareInternship
 * @requires module:app.models.forum.thread
 * @requires module:app.models.forum.message
 * @requires module:app.models.poll
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const { Model } = require('mongoose');

module.exports = {
  /**
   * @description Prototype Model
   * @constant
   *
   * @type {Model}
   */
  Model,

  /**
   * @description User Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.user
   */
  UserModel: require('./user'),

  /**
   * @description Role Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.role
   */
  RoleModel: require('./role'),

  /**
   * @description Club Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.club
   */
  ClubModel: require('./club'),

  /**
   * @description Event Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.event
   */
  EventModel: require('./event'),

  /**
   * @description Category Map Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.categoryMap
   */
  CategoryMapModel: require('./categoryMap'),

  /**
   * @description Tag Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.tag
   */
  TagModel: require('./tag'),

  /**
   * @description Media Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.media
   */
  MediaModel: require('./media'),

  /**
   * @description Album Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.album
   */
  AlbumModel: require('./album'),

  /**
   * @description Article Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.article
   */
  ArticleModel: require('./article'),

  /**
   * @description Comment Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.comment
   */
  CommentModel: require('./comment'),

  /**
   * @description Reaction Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.reaction
   */
  ReactionModel: require('./reaction'),

  /**
   * @description Issue Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.issue
   */
  IssueModel: require('./issue'),

  /**
   * @description Session Model
   * @constant
   *
   * @see module:app.models.session
   */
  SessionModel: require('./session'),

  /**
   * @description Squiggle Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.squiggle
   */
  SquiggleModel: require('./squiggle'),

  /**
   * @description Company Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.company
   */
  CompanyModel: require('./company'),

  /**
   * @description Live Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.live
   */
  LiveModel: require('./live'),

  /**
   * @description Share Internship Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.shareInternship
   */
  ShareInternshipModel: require('./shareInternship'),

  /**
   * @description Forum Thread Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.forum.thread
   */
  ForumThreadModel: require('./forumThread'),

  /**
   * @description Forum Message Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.forum.message
   */
  ForumMessageModel: require('./forumMessage'),

  /**
   * @description Poll Model
   * @constant
   *
   * @type {Model}
   * @see module:app.models.poll
   */
  PollModel: require('./poll'),
};
