/**
 * @module app.models.comment
 * @description Comment Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Comment Model
 * @constant CommentSchema
 *
 * @type {Schema}
 */
const CommentSchema = new Schema(
  {
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
    parentModel: {
      type: String,
      required: true,
      enum: ['Article', 'Comment'],
    },
    parentRef: {
      type: Schema.Types.ObjectId,
      refPath: 'parentModel',
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
    collection: 'comments',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Comment Model
 * @constant CommentModel
 *
 * @type {model}
 */
module.exports = model('Comment', CommentSchema);
