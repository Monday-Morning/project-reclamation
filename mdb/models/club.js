const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const clubSchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
        },
        website:{
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        facebook: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
        logo: {
            type: String,
            trim: true,
        },
        executive: [{
            type: Object,
        }],
        society: {
            type: String,
            trim: true,
        },
        desc: {
            type: String,
            trim: true,
        },
        facAd: {
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
        collection: 'clubs',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Club = model('Club', clubSchema);

module.exports = Club;