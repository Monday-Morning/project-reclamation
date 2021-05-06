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

const ArticleType = require('../article/article.type');
const MediaType = require('../media/media.type');
const { getUser } = require('./user.resolver');
const { getMedia } = require('../media/media.resolver');

const { AccountTypeEnumType, PositionEnumType, TeamEnumType } = require('./user.enum.types');

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

const ContributionUnionType = new GraphQLUnionType({
  name: 'ContributionUnion',
  types: [ArticleType, MediaType],
});

const ContributionType = new GraphQLObjectType({
  name: 'Contribution',
  fields: () => ({
    model: { type: GraphQLString },
    reference: { type: ContributionUnionType },
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

    pictureId: {
      type: GraphQLID,
      resolve: (parent) => parent.picture,
    },
    picture: {
      type: MediaType,
      resolve: (parent) => getMedia(null, { id: parent.picture }),
    },

    interestedTopics: { type: new GraphQLList(GraphQLInt) },
    isNewsletterSubscribed: { type: GraphQLBoolean },

    profile: { type: UserProfileType },

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
    createdByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.createdBy }, context, info),
    },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    updatedByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.updatedBy }, context, info),
    },
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
