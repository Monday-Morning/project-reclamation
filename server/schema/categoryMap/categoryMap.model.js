/**
 * @module app.schema.categoryMap.model
 * @description Category Map Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Category Map Model
 * @constant CategoryMapSchema
 *
 * @type {Schema}
 */
const CategoryMapSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
      min: 0,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parent: {
      number: {
        type: Number,
        required: false,
        min: 0,
        default: null,
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryMap',
        required: false,
      },
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
    collection: 'categoryMaps',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Category Map Model
 * @constant CategoryMapModel
 *
 * @type {model}
 */
module.exports = model('CategoryMap', CategoryMapSchema);
