const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      lowercase: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
      },
    ],
    verifiedType: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    nitrMail: {
      type: String,
      required: false,
      trim: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@nitrkl\.ac\.in$/i,
      lowercase: true,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
      // TODO: add path to default neutral profile picture
      default: '',
    },
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    facebook: {
      type: String,
      required: false,
      trim: true,
    },
    twitter: {
      type: String,
      required: false,
      trim: true,
    },
    instagram: {
      type: String,
      required: false,
      trim: true,
    },
    linkedin: {
      type: String,
      required: false,
      trim: true,
    },
    website: {
      type: String,
      required: false,
      trim: true,
    },
    github: {
      type: String,
      required: false,
      trim: true,
    },
    contributions: [
      {
        type: Object,
        required: false,
      },
    ],
    positions: [
      {
        type: Object,
        require: false,
      },
    ],
    ban: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    schemaVersion: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
    collection: 'users',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual('fullname')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function (v) {
    this.firstName = v.split(' ')[0];
    this.lastName = v.split(' ')[1] ? v.split(' ')[1] : null;
  });

const UserModel = model('User', UserSchema);

module.exports = UserModel;
