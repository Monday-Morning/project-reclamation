/**
 * @module app.schema.forum.thread.model
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
    // TODO: update with standard structure
    content: [
      {
        type: Object,
        required: true,
      },
    ],
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    /** Additional permission required */
    anonymous: {
      type: Boolean,
      required: false,
      default: false,
    },
    // TODO: create enumerated list of options
    authority: {
      type: String,
      required: false,
      trim: true,
    },
    /** [0 - Pending Moderation, 1 - Open, 2 - Closed] */
    threadStatus: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 2,
    },
    verifiedResponse: {
      response: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100,
      },
      /** [0 - Public Answer Verified, 1 - MM Answered, 2 - Authority Answered] */
      responseType: {
        type: Number,
        required: false,
        min: 0,
        max: 2,
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'ThreadMessage',
        required: false,
      },
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
      required: false,
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
