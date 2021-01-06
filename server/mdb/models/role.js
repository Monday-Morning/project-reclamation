/**
 * @module app.models.role
 * @description Role Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

/**
 * @description The schema definition for Role Model
 * @constant RoleSchema
 *
 * @type {Schema}
 */
const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    permissions: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
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
    collection: 'roles',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

/**
 * @description Generated Role Model
 * @constant RoleModel
 *
 * @type {model}
 */
module.exports = model('Role', RoleSchema);
