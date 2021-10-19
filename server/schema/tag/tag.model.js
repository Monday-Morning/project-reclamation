/**
 * @module app.schema.TagModel
 * @description Tag Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model, Model: _Model } = require('mongoose');

/**
 * @description The schema definition for Tag Model
 * @constant TagModel
 *
 * @type {Schema}
 */
const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    adminColor: {
      type: String,
      required: false,
      trim: true,
      uppercase: true,
      minLength: 6,
      maxLength: 6,
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
    collection: 'tags',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Tag Model
 * @constant TagModel
 *
 * @type {_Model}
 */
module.exports = model('Tag', TagSchema);
