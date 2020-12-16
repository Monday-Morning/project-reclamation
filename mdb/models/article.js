const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const articleSchema = new Schema(
    {
        title:{
            type: String,
            trim: true,
            required: true,
        },
        content:[{
            type: Object,
            required: true,
        }],
        excerpt:{
            type: String,
            trim: true,
            required: true,
        },
        inshort:{
            type: String,
            trim: true,
        },
        slug:{
            type: String,
            trim: true,
            required: true,
        },
        author:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        category:{
            type: Number,
            trim: true,
        },
        tags:[{
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        }],
        adminTags:[{
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        }],
        coverMedia:{
            type: String,
            trim: true,
        },
        status:{
            type: Number,
            required: true,
        },
        featured:{
            type: Boolean,
            required: false,
        },
        restrict:{
            type: Boolean,
        },
        reactionCount:{
            type: Number,
        },
        views:{
            type: Number,
        },
        readTime:{
            type: Number,
            trim: true,
            required: true,
        },
        timeSpent:{
            type: Number,
            trim: true,
            required: true,
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
        collection: 'articles',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Article = model('Article', articleSchema);

module.exports = Article;