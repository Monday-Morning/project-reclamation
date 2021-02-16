/**
 * @module app.schema.ForumMessageModel
 * @description Forum Message Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Forum Message Model
 * @constant ForumMessageSchema
 *
 * @type {Schema}
 */
const ForumMessageSchema = new Schema(
  {
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
    validatedResponse: {
      type: Boolean,
      required: false,
      default: false,
    },
    parentThread: {
      type: Schema.Types.ObjectId,
      ref: 'ForumThread',
      required: true,
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
    collection: 'forumMessages',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Forum Message Model
 * @constant ForumMessageModel
 *
 * @type {model}
 */
module.exports = model('ForumMessage', ForumMessageSchema);
