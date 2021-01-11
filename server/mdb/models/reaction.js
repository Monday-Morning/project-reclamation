/**
 * @module app.models.reaction
 * @description Reaction Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Reaction Model
 * @constant ReactionSchema
 *
 * @type {Schema}
 */
const ReactionSchema = new Schema(
  {
    /** @enum [0 - Like, 1 - Upvote] */
    type: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    user: {
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
    collection: 'users',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Reaction Model
 * @constant ReactionModel
 *
 * @type {model}
 */
module.exports = model('Reaction', ReactionSchema);
