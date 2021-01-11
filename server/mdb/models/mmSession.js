/**
 * @module app.models.mmSession
 * @description MM Session Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for MM Session Model
 * @constant MMSessionSchema
 *
 * @type {Schema}
 */
const MMSessionSchema = new Schema(
  {
    startTS: {
      type: Date,
      required: true,
    },
    endTS: {
      type: Date,
      required: false,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
    /**
     * Object {
     * 	position: String @enum [Member, Coordinator, Mentor],
     * 	team: String @enum [Content, Technical, Design, Photography],
     * 	user: Schema.Types.ObjectId,
     * 	ref: 'User',
     * }
     */
    team: [
      {
        type: Object,
        required: true,
      },
    ],
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
    collection: 'mmSessions',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated MM Session Model
 * @constant MMSessionModel
 *
 * @type {model}
 */
module.exports = model('MMSession', MMSessionSchema);
