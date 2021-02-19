/**
 * @module app.schema.UserType
 * @description User Type
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  GraphQLEnumType,
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

/**
 * @description Verified Field Enumerator
 * @constant
 *
 * @type {GraphQLEnumType}
 */
const VerifiedEnumType = new GraphQLEnumType({
  name: 'VerifiedEnum',
  values: {
    NORMAL: { value: 0 },
    NITR_STUDENT: { value: 1 },
    MM_TEAM: { value: 2 },
    NITR_FACULTY: { value: 3 },
  },
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
 * @description Position Field Enumerator
 * @constant
 *
 * @type {GraphQLEnumType}
 */
const PositionEnumType = new GraphQLEnumType({
  name: 'PositionEnum',
  values: {
    MEMBER: { value: 0 },
    COORDINATOR: { value: 1 },
    MENTOR: { value: 2 },
  },
});

/**
 * @description Team Field Enumerator
 * @constant
 *
 * @type {GraphQLEnumType}
 */
const TeamEnumType = new GraphQLEnumType({
  name: 'TeamEnum',
  values: {
    CONTENT: { value: 0 },
    PHOTOGRAPHY: { value: 1 },
    DESIGN: { value: 2 },
    TECHNICAL: { value: 3 },
  },
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
    verified: { type: VerifiedEnumType },
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

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    createdByUser: {
      type: UserType,
      resolve: async (parent, args, context, info) => {
        // TODO: Resolve to UserType
      },
    },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    updatedByUser: {
      type: UserType,
      resolve: async (parent, args, context, info) => {
        // TODO: Resolve to UserType
      },
    },
    schemaVersion: { type: GraphQLInt },
  }),
});

/**
 * @description User Type
 * @constant
 *
 * @type {GraphQLObjectType}
 */
module.exports = UserType;
