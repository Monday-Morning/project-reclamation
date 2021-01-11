/**
 * @module app.models.poll
 * @description Poll Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for Poll Model
 * @constant PollSchema
 *
 * @type {Schema}
 */
const PollSchema = new Schema(
  {
    question: [
      {
        type: Object,
        required: true,
      },
    ],
    options: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    optionsCount: [
      {
        type: Number,
        required: true,
        min: 0,
      },
    ],
    totalVotes: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    expiry: {
      type: Date,
      required: true,
      min: new Date(Date.now()),
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
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
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: 'polls',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Poll Model
 * @constant PollModel
 *
 * @type {model}
 */
module.exports = model('Poll', PollSchema);
