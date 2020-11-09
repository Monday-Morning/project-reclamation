const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

/*
	Privacy Levels:
	0 -> Private
	5 -> All Friends
	10 -> Public
*/
const privacySettingSchema = new Schema(
  {
    address: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 1,
    },
    country: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 8,
    },
    city: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 1,
    },
    dob: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 10,
    },
    email: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 10,
    },
    firstname: {
      type: Number,
      min: 10,
      max: 10,
      required: true,
      default: 10,
    },
    lastname: {
      type: Number,
      min: 10,
      max: 10,
      required: true,
      default: 10,
    },
    sex: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      default: 10,
    },
    photo: {
      type: Number,
      min: 3,
      max: 10,
      required: true,
      default: 10,
    },
    comments: {
      type: Boolean,
      required: true,
      default: true,
    },
    visibility: {
      type: Number,
      required: true,
      min: 8,
      max: 10,
      default: 10,
    },
    anonymous: {
      type: Boolean,
      required: true,
      default: false,
    },
    anonymousName: {
      type: String,
      required: true,
      default: 'Anonymous Human',
      enum: [
        'Anonymous Cat',
        'Anonymous Kitten',
        'Anonymous Dog',
        'Anonymous Puppy',
        'Anonymous Lion',
        'Anonymous Horse',
        'Anonymous Bear',
        'Anonymous Tiger',
        'Anonymous Cub',
        'Anonymous Elephant',
        'Anonymous Owl',
        'Anonymous Monkey',
        'Anonymous Wolf',
        'Anonymous Squirrel',
        'Anonymous Turtle',
        'Anonymous Fox',
        'Anonymous Eagle',
        'Anonymous Whale',
        'Anonymous Leopard',
        'Anonymous Kangaroo',
        'Anonymous Giraffe',
        'Anonymous Human',
      ],
    },
  },
  {
    timestamps: true,
    collection: 'privacySettings',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const PrivacySetting = model('PrivacySetting', privacySettingSchema);

module.exports = PrivacySetting;
