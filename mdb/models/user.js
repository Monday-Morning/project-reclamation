const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const userSchema = new Schema(
  {
    address: {
      type: String,
      required: false,
      default: null,
      trim: true,
      minlength: [2, 'Invalid Address'],
    },
    city: {
      type: String,
      required: false,
      default: null,
      trim: true,
      minlength: [2, 'Invalid City'],
    },
    country: {
      type: String,
      required: false,
      default: null,
      trim: true,
      minlength: [2, 'Invalid Country'],
    },
    dob: {
      type: Date,
      required: true,
      max: [new Date(Date.now() - 12 * 365 * 24 * 60 * 60 * 1000), 'Age To Low'],
      default: new Date(946684800),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      lowercase: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    level: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
      default: 1,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    photo: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    privacy: {
      type: Schema.Types.ObjectId,
      ref: 'PrivacySetting',
      required: true,
    },
    sex: {
      type: String,
      enum: ['male', 'female', 'other'],
      trim: true,
      default: 'other',
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema
  .virtual('fullname')
  .get(function () {
    return this.firstname + ' ' + this.lastname;
  })
  .set(function (v) {
    if (v.split(' ').length <= 1) {
      this.firstname = v.split(' ')[0];
      this.lastname = null;
    } else {
      this.firstname = v.substr(0, v.indexOf(' '));
      this.lastname = v.substr(v.indexOf(' ') + 1);
    }
  });

const User = model('User', userSchema);

module.exports = User;
