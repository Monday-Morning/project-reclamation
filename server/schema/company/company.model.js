/**
 * @module app.schema.CompanyModel
 * @description Company Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Company Model
 * @constant CompanySchema
 *
 * @type Schema
 */
const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    alias: [
      {
        type: String,
        required: false,
        trim: true,
      },
    ],
    location: {
      type: String,
      required: false,
      trim: true,
    },
    logo: {
      /** [0 - Adamantium Archive A, 1 - Adamantium Archive B, 2 - Active Store] */
      store: {
        type: Number,
        required: false,
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
    collection: 'companies',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Company Model
 * @constant CompanyModel
 *
 * @type {model}
 */
module.exports = model('Company', CompanySchema);
