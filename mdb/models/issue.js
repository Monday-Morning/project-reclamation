const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const issueSchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
        },
        slug:{
            type: String,
            trim: true,
        },
        publishedAt: {
            type: Schema.Types.ObjectId,
        },
        articles: [{
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }],
        featuredSlider: [{
            type: Schema.Types.ObjectId,
        }],
        featuredTop4: [{
            type: Schema.Types.ObjectId,
        }],
        thumbnail: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
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
        collection: 'issues',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Issue = model('Issue', issueSchema);

module.exports = Issue;