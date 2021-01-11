/**
 * @module app.models.event
 * @description Event Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Event Model
 * @constant EventSchema
 *
 * @type {Schema}
 */
const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startTS: {
      type: Date,
      required: true,
    },
    endTS: {
      type: Date,
      required: true,
    },
    poster: {
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    },
    /** @enum [0 - Club, 1 - Institute, 2 - Fest, 3 - Holiday] */
    type: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 3,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    venue: {
      type: String,
      required: false,
    },
    hits: {
      type: Number,
      required: true,
      default: 0,
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
    collection: 'events',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Event Model
 * @constant EventModel
 *
 * @type {model}
 */
module.exports = model('Event', EventSchema);
