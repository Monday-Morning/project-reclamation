const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const roleSchema = new Schema(
    {
        role:{
            type: String,
            trim: true,
            required: true,
        },
        permission:[{
            type: String,
            required: true,
        }],
        schemaVersion: {
            type: Number,
            required: true,
            default: 1,
          },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
    },
    {
        timestamps: true,
        collection: 'roles',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Role = model('Role', roleSchema);

module.exports = Role;