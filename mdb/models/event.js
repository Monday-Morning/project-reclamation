const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const eventSchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
        },
        slug:{
            type: String,
            trim: true,
        },
        startTS: {
            type: Number,
            default: (new Date()).getTime(),
        },
        endTS: {
            type: Number,
            default: (new Date()).getTime(),
        },
        host: {
            type: Schema.Types.ObjectId,
        },
        url: {
            type: String,
            trim: true,
        },
        venue: {
            type: String,
            trim: true,
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
        collection: 'events',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;