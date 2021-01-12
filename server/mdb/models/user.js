/**
 * @module app.models.user
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
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      lowercase: true,
      unique: true,
    },
    /** @default reader */
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
      },
    ],
    /** @enum [0 - Normal, 1 - NITR Student, 2 - MM, 3 - NITR Faculty] */
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
      type: Schema.Types.ObjectId,
      ref: 'Media',
      required: true,
    },
    /** Only For MM & NITR Faculty */
    bio: {
      type: String,
      required: false,
      trim: true,
    },
    /** Only For MM & NITR Faculty */
    facebook: {
      type: String,
      required: false,
      trim: true,
    },
    /** Only For MM & NITR Faculty */
    twitter: {
      type: String,
      required: false,
      trim: true,
    },
    /** Only For MM & NITR Faculty */
    instagram: {
      type: String,
      required: false,
      trim: true,
    },
    /** Only For MM & NITR Faculty */
    linkedin: {
      type: String,
      required: false,
      trim: true,
    },
    /** Only For MM & NITR Faculty */
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
    /**
     * Object {
     * 	onModel: "Article" || "Media",
     *	modelRef: Schema.Types.ObjectID
     * }
     */
    contributions: [
      {
        type: Object,
        required: false,
      },
    ],
    /**
     * Only For MM
     * Object {
     * 	type: {Number}[0 - Member, 1 - Coordinator, 3 - Mentor],
     * 	team: {Number}[0 - Content, 1 - Technical, 2 - Design, 3 - Photography],
     *	session: Number,
     * }
     */
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
    /** @see module:app.models.poll */
    lastPoll: {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
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
