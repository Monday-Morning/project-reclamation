/**
 * @module app.models.forum.thread
 * @description Forum Thread Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Forum Thread Model
 * @constant ForumThreadSchema
 *
 * @type {Schema}
 */
const ForumThreadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: [
      {
        type: Object,
        required: true,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    /** Additional permission required */
    anonymous: {
      type: Boolean,
      required: false,
      default: false,
    },
    authority: {
      type: String,
      required: false,
      trim: true,
    },
    /** @enum [0 - Pending Moderation, 1 - Open, 2 - Closed] */
    threadStatus: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 2,
    },
    /**
      response: {
        type: Schema.Types.ObjectId,
        ref: 'ForumMessage',
        required: false,
        default: null,
      },
      @enum [0 - Unanswered, 1 - Public Answer Verified, 2 - MM Answered, 3 - Authority Answered]
      responseType: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 3,
      },
    */
    verifiedResponse: {
      type: Object,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    schemaVersion: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: 'forumThreads',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Forum Thread Model
 * @constant ForumThreadModel
 *
 * @type {model}
 */
module.exports = model('ForumThread', ForumThreadSchema);
