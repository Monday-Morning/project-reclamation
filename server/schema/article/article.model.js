/**
 * @module app.schema.ArticleModel
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
    /** [0 - Normal Article, 1 - Witsdom, 2 - Photostory] */
    articleType: {
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
    // TODO: update content with final structure
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
    authors: [
      {
        name: {
          type: String,
          required: true,
        },
        details: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    tech: [
      {
        name: {
          type: String,
          required: true,
        },
        details: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    category: [
      {
        subcategory: {
          type: Boolean,
          required: true,
        },
        number: {
          type: Number,
          required: true,
          min: 0,
        },
        reference: {
          type: Schema.Types.ObjectId,
          ref: 'CategoryMap',
          required: true,
        },
      },
    ],
    tags: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        admin: {
          type: Boolean,
          required: false,
          default: false,
        },
        reference: {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
          required: true,
        },
      },
    ],
    coverMedia: {
      square: {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: true,
      },
      rectangle: {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: true,
      },
    },
    /** [0 - Unpublished, 1 - Published, 2 - Archive, 3 - Trash] */
    status: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    isInstituteRestricted: {
      type: Boolean,
      required: false,
      default: false,
    },
    engagementCount: {
      reactions: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
      },
      comments: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
      },
      bookmarks: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
      },
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
      required: false,
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
