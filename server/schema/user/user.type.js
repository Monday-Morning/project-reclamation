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

const { readUserById } = require('./user.resolver');

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

// TODO: Resolve to ArticleType or MediaType
/*
const ContributionUnionType = new GraphQLUnionType({
	name: 'ContributionUnion',
	types: [ArticleType, MediaType],
})

const ContributionType = new GraphQLObjectType({
	name: 'Contribution',
  fields: () => ({
		model: { type: GraphQLString },
    reference: { type: ContributionUnionType },
  }),
});
*/

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

    pictureId: { type: GraphQLID },
    // TODO: Resolve to MediaType
    /*
		picture: {
			type: MediaType,
			resolve: async (parent, args, context, info) => {},
		}
		*/

    interestedTopics: { type: new GraphQLList(GraphQLInt) },
    newsletter: { type: GraphQLBoolean },

    profile: {
      type: UserProfileType,
      resolve: async (parent, args, context, info) => {
        // TODO: Check permission and return data from parent
      },
    },

    /*
    contributions: {
      type: new GraphQLList(ContributionType),
		},
		*/
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
      resolve: (parent, _, context) => readUserById(null, { id: parent.id }, context, null),
    },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    updatedByUser: {
      type: UserType,
      resolve: (parent, _, context) => readUserById(null, { id: parent.id }, context, null),
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
