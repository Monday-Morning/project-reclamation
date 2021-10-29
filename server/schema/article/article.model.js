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

const { Schema, model, Model: _Model } = require('mongoose');

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
    inshort: {
      type: String,
      required: false,
      trim: true,
    },
    users: [
      {
        name: {
          type: String,
          required: true,
        },
        /** [0 - Content, 1 - Photo & Films, 2 - Design, 3 - Technical] */
        team: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
        details: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    categories: [
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
        isAdmin: {
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
        required: false,
      },
      rectangle: {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: false,
      },
    },
    approvalStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** [0 - Unpublished, 1 - Published, 2 - Archived, 3 - Trashed] */
    publishStatus: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 3,
    },
    isInstituteRestricted: {
      type: Boolean,
      required: false,
      default: false,
    },
    // TODO: update content with final structure
    content: [
      {
        text: {
          type: String,
          required: true,
        },
        /** Only for types 5-14 */
        data: {
          type: Object,
          required: false,
        },
        /** Only for image type */
        media: {
          type: Schema.Types.ObjectId,
          ref: 'Media',
          required: false,
        },
        /**
         * [
         * 0 - Paragraph
         * 1 - H1
         * 2 - H2
         * 3 - H3
         * 4 - Image
         * 5 - Quote
         * 6 - Ordered List
         * 7 - Unordered List
         * 8 - Table
         * 9 - Bar Graph
         * 10 - Column Graph
         * 11 - Line Chart
         * 12 - Pie Chart
         * 13 - Horizontal Line
         * 14 - IFrame
         * ]
         */
        contentType: {
          type: Number,
          required: true,
          min: 0,
          max: 14,
        },
        blockFormatting: {
          /** [0 - Left, 1 - Center, 2 - Right, 3 - Justify] */
          align: {
            type: Number,
            required: false,
            default: 0,
            min: 0,
            max: 3,
          },
          /** Only for table type */
          hasHeaderRow: {
            type: Boolean,
            required: false,
          },
          hasHeaderColumn: {
            type: Boolean,
            required: false,
          },
          /**
           * Only for list types
           *
           * [
           * 0 - Uppercase Alphabets
           * 1 - Lowercase Alphabaets
           * 2 - Uppercase Roman Numbers
           * 3 - Lowercase Roman Numbers
           * 4 - Standards Numbers
           * 5 - Bullet/Filled Circle
           * 6 - Hollow Circle
           * 7 - Dash
           * 8 - Filled Square
           * 9 - Hollow Square
           * ]
           */
          listStyle: {
            type: Number,
            required: false,
            min: 0,
            max: 9,
          },
        },
      },
    ],
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
    },
    /** In Seconds */
    readTime: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    /** In Seconds */
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
 * @type {_Model}
 */
module.exports = model('Article', ArticleSchema);
