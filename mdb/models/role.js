const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

const RoleModel = model('Role', RoleSchema);

module.exports = RoleModel;
