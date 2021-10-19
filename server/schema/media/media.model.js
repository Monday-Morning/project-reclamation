/**
 * @module app.schema.MediaModel
 * @description Media Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model, Model: _Model } = require('mongoose');

/**
 * @description The schema definition for Media Model
 * @constant MediaSchema
 *
 * @type {Schema}
 */
const MediaSchema = new Schema(
  {
    authors: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        details: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    storePath: {
      type: String,
      required: true,
      trim: true,
    },
    /** [0 - Image, 1 - Video] */
    mediaType: {
      type: Number,
      required: false,
      min: 0,
      max: 1,
      default: 0,
    },
    /** Only if type is 0 */
    blurhash: {
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
    collection: 'media',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Media Model
 * @constant MediaModel
 *
 * @type {_Model}
 */
module.exports = model('Media', MediaSchema);
