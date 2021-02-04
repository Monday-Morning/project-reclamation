/**
 * @module app.models.album
 * @description Album Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Album Model
 * @constant AlbumSchema
 *
 * @type {Schema}
 */
const AlbumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        reference: {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
          required: false,
        },
      },
    ],
    cover: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    },
    media: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media',
        required: true,
      },
    ],
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
    hits: {
      type: Number,
      required: true,
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
    collection: 'albums',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Album Model
 * @constant AlbumModel
 *
 * @type {model}
 */
module.exports = model('Album', AlbumSchema);
