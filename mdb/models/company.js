const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const comapanySchema = new Schema(
    {
        name:{
            type: String,
            trim: true,
        },
        alias:{
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
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
        collection: 'companies',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Company = model('Company', comapanySchema);

module.exports = Company;