const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const forumSchema = new Schema(
    {
        title:{
            type: String,
            trim: true,
        },
        content:[{
            type: Object,
        }],
        user: {
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
        collection: 'forums',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Forum = model('Forum', forumSchema);

module.exports = Forum;