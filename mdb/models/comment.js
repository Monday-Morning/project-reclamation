const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const commentSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content:{
            type: String,
            required: true,
        },
        approved: {
            type: Boolean,
        },
        modelRef: {
            type: Schema.Types.ObjectId,
        },
        onModel: {
            type: Schema.Types.ObjectId,
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
        collection: 'comments',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;