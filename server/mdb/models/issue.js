/**
 * @module app.models.issue
 * @description Issue Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Issue Model
 * @constant IssueSchema
 *
 * @type {Schema}
 */
const IssueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
      },
    ],
    featured: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
      },
    ],
    // TODO: Add poll field after Poll Model
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
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
    collection: 'issues',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Issue Model
 * @constant IssueModel
 *
 * @type {model}
 */
module.exports = model('Issue', IssueSchema);
