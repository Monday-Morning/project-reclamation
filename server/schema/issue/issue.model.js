/**
 * @module app.schema.IssueModel
 * @description Issue Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model, Model: _Model } = require('mongoose');

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
    thumbnail: {
      /** [0 - Adamantium Archive A, 1 - Adamantium Archive B, 2 - Active Store] */
      store: {
        type: Number,
        required: false,
        default: 2,
        min: 0,
        max: 2,
      },
      storePath: {
        type: String,
        required: false,
      },
      blurhash: {
        type: String,
        required: false,
      },
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      required: false,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
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
 * @type {_Model}
 */
module.exports = model('Issue', IssueSchema);
