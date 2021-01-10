/**
 * @module app.models.article
 * @description Article Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Article Model
 * @constant ArticleSchema
 *
 * @type {Schema}
 */
const ArticleSchema = new Schema(
  {
    /** @enum [0 - Normal Article, 1 - Witsdom, 2 - Photostory] */
    type: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
    },
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
    inshort: {
      type: String,
      required: false,
      trim: true,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    category: [
      {
        type: Number,
        required: true,
        min: 0,
      },
    ],
    subcategory: [
      {
        type: Number,
        required: true,
        min: 0,
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
      },
    ],
    /** [Square Image, Rectangle Image] */
    coverMedia: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: true,
      },
    ],
    /** @enum [0 - Unpublished, 1 - Published, 2 - Archive, 3 - Trash] */
    status: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    restrict: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Object {
     * 	reactions: Number,
     * 	comments: Number,
     * 	bookmarks: Number,
     * }
     */
    engagementCount: {
      type: Object,
      required: true,
    },
    /** For reads > 10% of readTime */
    views: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    /** For each load */
    hits: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    readTime: {
      type: Number,
      required: true,
      min: 0,
    },
    timeSpent: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
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
    collection: 'articles',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Article Model
 * @constant ArticleModel
 *
 * @type {model}
 */
module.exports = model('Article', ArticleSchema);
