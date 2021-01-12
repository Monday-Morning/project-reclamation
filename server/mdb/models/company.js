/**
 * @module app.models.company
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
        required: true,
        trim: true,
      },
    ],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: Schema.Types.ObjectId,
      required: true,
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
      required: true,
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
