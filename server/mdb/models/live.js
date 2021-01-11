/**
 * @module app.models.live
 * @description Live Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Live Model
 * @constant LiveSchema
 *
 * @type {Schema}
 */
const LiveSchema = new Schema(
  {
    /** @enum [0-3 - Category 0-3, 4 - Internship] */
    type: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    recruits: {
      type: Number,
      required: false,
      min: 0,
    },
    /**
     * Object {
     * 	name: String,
     * 	rollno: String,
     * 	branch: String, @enum [All Branches]
     * 	degree: String, @enum [All Degrees]
     * }
     */
    studentsRecruited: [
      {
        type: Object,
        required: false,
      },
    ],
    ctc: {
      type: String,
      required: false,
      trim: true,
    },
    /** For type 4 - Add internship duration */
    benefits: {
      type: String,
      required: false,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
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
    collection: 'live',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Live Model
 * @constant LiveModel
 *
 * @type {model}
 */
module.exports = model('Live', LiveSchema);
