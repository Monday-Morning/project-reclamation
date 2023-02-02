/**
 * @module app.schema.CommentModel
 * @description Comment Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model, Model: _Model } = require('mongoose');

/**
 * @description The schema definition for Comment Model
 * @constant CommentSchema
 *
 * @type {Schema}
 */
const CommentSchema = new Schema(
  {
    content: {
        type: String,
        required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
      },
    },
    parent: {
      model: {
        type: String,
        required: true,
        enum: ['Article', 'Comment'],
      },
      reference: {
        type: Schema.Types.ObjectId,
        refPath: 'parent.model',
        required: true,
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
    collection: 'comments',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Comment Model
 * @constant CommentModel
 *
 * @type {_Model}
 */
module.exports = model('Comment', CommentSchema);
