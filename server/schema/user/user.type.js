/**
 * @module app.schema.UserType
 * @description User Type
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.UserResolver
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  // GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const { AccountTypeEnumType, PositionEnumType, TeamEnumType } = require('./user.enum.types');

// TODO: Extract and standardize as common Image type
const ProfilePictureType = new GraphQLObjectType({
  name: 'ProfilePicture',
  fields: () => ({
    storePath: { type: GraphQLString },
    blurhash: { type: GraphQLString },
  }),
});

/**
 * @description User Profile Type
 * @constant
 *
 * @type {GraphQLObjectType}
 */
const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: () => ({
    bio: { type: GraphQLString },
    facebook: { type: GraphQLString },
    twitter: { type: GraphQLString },
    instagram: { type: GraphQLString },
    linkedin: { type: GraphQLString },
    website: { type: GraphQLString },
    github: { type: GraphQLString },
  }),
});

// TODO: rework the resolving method and structure
const ContributionType = new GraphQLObjectType({
  name: 'Contribution',
  fields: () => ({
    model: { type: GraphQLString },
    reference: { type: GraphQLID },
  }),
});

/**
 * @description User Position Type
 * @constant
 *
 * @type {GraphQLObjectType}
 */
const PositionType = new GraphQLObjectType({
  name: 'Position',
  fields: () => ({
    position: { type: PositionEnumType },
    team: { type: TeamEnumType },
    session: { type: GraphQLInt },
  }),
});

/**
 * @description User Type
 * @constant
 *
 * @type {GraphQLObjectType}
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    accountType: { type: AccountTypeEnumType },
    nitrMail: { type: GraphQLString },
    picture: { type: ProfilePictureType },

    interestedTopics: { type: new GraphQLList(GraphQLInt) },
    isNewsletterSubscribed: { type: GraphQLBoolean },

    profile: { type: UserProfileType },

    // TODO: rework the resolving method and structure
    contributions: {
      type: new GraphQLList(ContributionType),
    },
    positions: {
      type: new GraphQLList(PositionType),
    },

    isBanned: { type: GraphQLBoolean },

    lastPollID: { type: GraphQLID },
    // TODO: resolve to PollType
    /*
		lastPoll: {
			type: PollType,
			resolve: async (parent, args, context, info) => {},
		},
		*/

    isNameChanged: { type: GraphQLBoolean },
    verifyEmailToken: { type: GraphQLString },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

/**
 * @description User Type
 * @constant UserType
 *
 * @type {GraphQLObjectType}
 */
module.exports = UserType;
