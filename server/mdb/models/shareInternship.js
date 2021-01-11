/**
 * @module app.models.shareInternships
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentYear: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    /** if company is registred */
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: false,
    },
    /**
     * if company is not registered
     * Object {
     * 	name: String,
     * 	location: String,
     * }
     */
    organization: {
      type: Object,
      required: false,
    },
    /** Written in weeks */
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    applyProcess: [
      {
        type: Object,
        required: true,
      },
    ],
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
      required: true,
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
