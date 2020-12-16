const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const publishcronSchema = new Schema(
    {
        modelRef: {
            type: Schema.Types.ObjectId,
        },
        onModel: {
            type: String,
        },
        time:{
            type: Number,
            default: (new Date()).getTime()
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
        collection: 'publishcrons',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Publishcron = model('Publishcron', publishcronSchema);

module.exports = Publishcron;