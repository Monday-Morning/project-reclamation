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
        required: false,
      },
    ],
    featured: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: false,
      },
    ],
    polls: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: false,
      },
    ],
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: false,
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
      required: false,
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
