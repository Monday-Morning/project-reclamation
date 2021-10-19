/**
 * @module app.schema.SquiggleModel
 * @description Squiggle Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model, Model: _Model } = require('mongoose');

/**
 * @description The schema definition for Squiggle Model
 * @constant SquiggleSchema
 *
 * @type {Schema}
 */
const SquiggleSchema = new Schema(
  {
    // TODO: update with standard content structure
    content: [
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
      required: false,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: 'squiggles',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Squiggle Model
 * @constant SquiggleModel
 *
 * @type {_Model}
 */
module.exports = model('Squiggle', SquiggleSchema);
