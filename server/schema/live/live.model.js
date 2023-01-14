/**
 * @module app.schema.LiveModel
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
    /** [0-3 - Category 0-3, 4 - Internship] */
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
      required: true,
      min: 0,
    },
    year: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    /** [0 - Autumn, 1 - Spring] */
    semester: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    studentsRecruited: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        rollNumber: {
          type: String,
          required: false,
          trim: true,
          minlength: 9,
          maxlength: 9,
        },
        branch: {
          type: String,
          required: true,
          trim: true,
          enum: [
            'Biotechnology & Biomedical Engineering',
            'Ceramic Engineering',
            'Chemical Engineering',
            'Civil Engineering',
            'Computer Science and Engineering',
            'Department of Chemistry',
            'Department of Humanities',
            'Department of Life Science',
            'Department of Mathematics',
            'Department of Physics',
            'Electrical Engineering',
            'Electronics and Communication Engineering',
            'Food Process Engineering',
            'Industrial Design',
            'Mechanical Engineering',
            'Metallurgical and Materials Engineering',
            'Mining Engineering',
            'Planning and Architecture',
            'School of Management',
            'Department of Earth and Atmospheric Science',
            'Electronics and Instrumentation Engineering',
            'Safety Engineering',
            'Department of Applied Geology',
          ],
        },
        degree: {
          type: String,
          required: true,
          trim: true,
          enum: [
            'B.Tech',
            'M.Tech',
            'M.Tech (Research)',
            'Dual Degree M.Tech',
            'M.Sc',
            'Integrated M.Sc',
            'PhD',
            'School of Management',
          ],
        },
      },
    ],
    ctc: {
      type: String,
      required: true,
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
      required: false,
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
    collection: 'live',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

LiveSchema.virtual('internshipDuration')
  .get(function () {
    return this.type === 4 ? this.benefits ?? 'N/A' : 'N/A';
  })
  .set(function (x) {
    if (this.type === 4) {
      this.benefits = x;
    }
  });

/**
 * @description Generated Live Model
 * @constant LiveModel
 *
 * @type {model}
 */
module.exports = model('Live', LiveSchema);
