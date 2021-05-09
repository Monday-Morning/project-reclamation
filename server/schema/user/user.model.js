/**
 * @module app.schema.UserModel
 * @description User Model
 *
 * @requires mongoose.Schema
 * @requires mongoose.model
 *
 * @version schema:v1
 * @since 0.1.0
 */

const { Schema, model } = require('mongoose');

/**
 * @description The schema definition for User Model
 * @constant UserSchema
 *
 * @type {Schema}
 */
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
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@gmail(\.([^<>()[\]\.,;:\s@\"]{2,})){1,}$/i,
      lowercase: true,
      unique: true,
    },
    /** [0 - Normal, 1 - NITR Student, 2 - MM, 3 - NITR Faculty] */
    accountType: {
      type: Number,
      required: false,
      min: 0,
      max: 3,
      default: 0,
    },
    nitrMail: {
      type: String,
      required: false,
      trim: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@nitrkl\.ac\.in$/i,
      lowercase: true,
      unique: true,
    },
    picture: {
      storePath: {
        type: String,
        required: false,
      },
      blurhash: {
        type: String,
        required: false,
      },
    },
    interestedTopics: [
      {
        type: Number,
        required: false,
        min: 0,
      },
    ],
    isNewsletterSubscribed: {
      type: Boolean,
      required: false,
    },
    /** Only For MM & NITR Faculty */
    profile: {
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
      /** Only For MM Tech Team */
      github: {
        type: String,
        required: false,
        trim: true,
      },
    },
    contributions: [
      {
        model: {
          type: String,
          required: false,
          trim: true,
          enum: ['Article', 'Media'],
        },
        reference: {
          type: Schema.Types.ObjectId,
          refPath: 'contributions.model',
          required: false,
        },
      },
    ],
    positions: [
      {
        /** [0 - Member, 1 - Coordinator, 2 - Mentor] */
        position: {
          type: Number,
          required: false,
          min: 0,
          max: 2,
        },
        /** [0 - Content, 1 - Photography, 2 - Design, 3 - Technical] */
        team: {
          type: Number,
          required: false,
          min: 0,
          max: 3,
        },
        session: {
          type: Number,
          required: false,
        },
      },
    ],
    isBanned: {
      type: Boolean,
      required: false,
    },
    /** @see module:app.models.poll */
    lastPoll: {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
      required: false,
    },
    isNameChanged: {
      type: Boolean,
      required: false,
    },
    verfiyEmailToken: {
      type: String,
      required: false,
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
      required: false,
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

/** Creating a virtual field - fullName */
UserSchema.virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function (v) {
    [this.firstName, this.lastName] = v.split(' ');
    this.lastName = !this.lastName ? null : this.lastName;
  });

/**
 * @description Generated User Model
 * @constant UserModel
 *
 * @type {model}
 */
module.exports = model('User', UserSchema);
