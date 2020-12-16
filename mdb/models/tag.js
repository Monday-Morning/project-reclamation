const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const tagSchema = new Schema(
    {
        text:{
            type: String,
        },
        admin:{
            type: Boolean,
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
        collection: 'tags',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Tag = model('Tag', tagSchema);

module.exports = Tag;