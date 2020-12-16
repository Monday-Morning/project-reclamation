const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const holidaySchema = new Schema(
    {
        start:{ 
            type: Date,
            default: Date.now,
        },
        end:{ 
            type: Date,
            default: Date.now,
        },
        name: {
            type: String,
            trim: true,
        },
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
        collection: 'holidays',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Holiday = model('Holiday', holidaySchema);

module.exports = Holiday;