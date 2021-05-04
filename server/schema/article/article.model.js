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
        plaintext: {
          type: String,
          required: true,
        },
        /** Only for types 5-12 */
        data: {
          type: Object,
          required: false,
        },
        /** Only for image type */
        media: {
          type: Schema.Types.ObjectId,
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
         * ]
         */
        contentType: {
          type: Number,
          required: true,
          min: 0,
          max: 13,
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
          /**
           * Only for list types
           *
           * For type 6 - ordered list
           * [0 - Uppercase Alphabets, 1 - Lowercase Alphabaets, 2 - Uppercase Roman Numbers, 3 - Lowercase Roman Numbers, 4 - Standards Numbers]
           *
           * For type 7 - unordered list
           * [0 - Bullet/Filled Circle, 1 - Hollow Circle, 2 - Dash, 3 - Filled Square, 4 - Hollow Square]
           */
          listStyle: {
            type: Number,
            required: false,
            min: 0,
            max: 4,
          },
        },
        textFormatting: [
          {
            bold: {
              type: Boolean,
              required: false,
            },
            italic: {
              type: Boolean,
              required: false,
            },
            underline: {
              type: Boolean,
              required: false,
            },
            strikethrough: {
              type: Boolean,
              required: false,
            },
            size: {
              type: Number,
              required: false,
              min: 1,
              max: 48,
            },
            /** Zero based index of starting character (inclusive) */
            start: {
              type: Number,
              required: false,
            },
            /** Zero based index of ending character (inclusive) */
            end: {
              type: Number,
              required: false,
            },
          },
        ],
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
    /** In Minutes */
    readTime: {
      type: Number,
      required: true,
      min: 0,
    },
    /** In Minutes */
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
