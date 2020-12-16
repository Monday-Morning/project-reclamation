const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const albumSchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
        },
        tags:[{
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        }],
        slug: {
            type: String,
            trim: true,
        },
        cover: {
            type: Schema.Types.ObjectId,
        },
        hits: {
            type: Number,
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
        collection: 'albums',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Album = model('Album', albumSchema);

module.exports = Album;