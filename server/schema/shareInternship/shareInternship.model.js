/**
 * @module app.schema.shareInternships.model
 * @description Share Internship Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Share Internship Model
 * @constant ShareInternshipSchema
 *
 * @type {Schema}
 */
const ShareInternshipSchema = new Schema(
  {
    internYear: {
      type: Number,
      required: true,
      max: new Date(Date.now()).getFullYear(),
    },
    student: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      year: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: String,
        required: false,
        trim: true,
      },
      /** if company is registred */
      reference: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
      },
    },
    /** Written in weeks */
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    // TODO: update with standard content structure
    applyProcess: [
      {
        type: Object,
        required: true,
      },
    ],
    // TODO: update with standard content structure
    experience: [
      {
        type: Object,
        required: true,
      },
    ],
    approved: {
      type: Boolean,
      required: false,
      default: false,
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
    collection: 'shareInternships',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Share Internship Model
 * @constant ShareInternshipModel
 *
 * @type {model}
 */
module.exports = model('ShareInternship', ShareInternshipSchema);
