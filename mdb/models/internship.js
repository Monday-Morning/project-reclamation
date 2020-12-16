const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const internshipSchema = new Schema(
    {
        internYear:{
            type: Number,
        },
        student:{
            type: Schema.Types.ObjectId,
        },
        studentYear: {
            type: Number,
        },
        organization: {
            type: String,
            trim: true,
        },
        duration: {
            type: Number,
        },
        applyProcess: {
            type: String,
            trim: true,
        },
        experience: {
            type: String,
            trim: true,
        },
        approved: {
            type: Boolean,
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
        collection: 'internships',
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Internship = model('Internship', internshipSchema);

module.exports = Internship;