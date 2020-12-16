const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const reactionSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type:{
            type: Number,
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
        collection: 'reactions',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;