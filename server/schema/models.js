/**
 * @module app.schema.models
 * @description MongoDB Models
 *
 * @requires module:app.schema.user.model
 * @requires module:app.schema.role.model
 * @requires module:app.schema.club.model
 * @requires module:app.schema.event.model
 * @requires module:app.schema.categoryMap.model
 * @requires module:app.schema.tag.model
 * @requires module:app.schema.media.model
 * @requires module:app.schema.album.model
 * @requires module:app.schema.article.model
 * @requires module:app.schema.comment.model
 * @requires module:app.schema.reaction.model
 * @requires module:app.schema.issue.model
 * @requires module:app.schema.session.model
 * @requires module:app.schema.squiggle.model
 * @requires module:app.schema.company.model
 * @requires module:app.schema.live.model
 * @requires module:app.schema.shareInternship.model
 * @requires module:app.schema.forum.thread.model
 * @requires module:app.schema.forum.message.model
 * @requires module:app.schema.poll.model
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
   * @see module:app.schema.user.model
   */
  UserModel: require('./user/user.model'),

  /**
   * @description Role Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.role.model
   */
  RoleModel: require('./role/role.model'),

  /**
   * @description Club Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.club.model
   */
  ClubModel: require('./club/club.model'),

  /**
   * @description Event Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.event.model
   */
  EventModel: require('./event/event.model'),

  /**
   * @description Category Map Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.categoryMap.model
   */
  CategoryMapModel: require('./categoryMap/categoryMap.model'),

  /**
   * @description Tag Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.tag.model
   */
  TagModel: require('./tag/tag.model'),

  /**
   * @description Media Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.media.model
   */
  MediaModel: require('./media/media.model'),

  /**
   * @description Album Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.album.model
   */
  AlbumModel: require('./album/album.model'),

  /**
   * @description Article Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.article.model
   */
  ArticleModel: require('./article/article.model'),

  /**
   * @description Comment Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.comment.model
   */
  CommentModel: require('./comment/comment.model'),

  /**
   * @description Reaction Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.reaction.model
   */
  ReactionModel: require('./reaction/reaction.model'),

  /**
   * @description Issue Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.issue.model
   */
  IssueModel: require('./issue/issue.model'),

  /**
   * @description Session Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.session.model
   */
  SessionModel: require('./session/session.model'),

  /**
   * @description Squiggle Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.squiggle.model
   */
  SquiggleModel: require('./squiggle/squiggle.model'),

  /**
   * @description Company Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.company.model
   */
  CompanyModel: require('./company/company.model'),

  /**
   * @description Live Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.live.model
   */
  LiveModel: require('./live/live.model'),

  /**
   * @description Share Internship Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.shareInternship.model
   */
  ShareInternshipModel: require('./shareInternship/shareInternship.model'),

  /**
   * @description Forum Thread Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.models.thread.model
   */
  ForumThreadModel: require('./forumThread/forumThread.model'),

  /**
   * @description Forum Message Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.models.message.model
   */
  ForumMessageModel: require('./forumMessage/forumMessage.model'),

  /**
   * @description Poll Model
   * @constant
   *
   * @type {Model}
   * @see module:app.schema.poll.model
   */
  PollModel: require('./poll/poll.model'),
};
