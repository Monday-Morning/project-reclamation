/**
 * @module app.schema.UserMutation
 * @description User Mutation
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
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const UserType = require('./user.type');
const {
  createUser,
  setUserBan,
  updateUserName,
  updateUserPicture,
  updateUserTopics,
  updateUserBio,
  addNITRMail,
  verifyNITRMail,
  newsletterSubscription,
  setUserAccountType,
} = require('./user.resolver');

module.exports = new GraphQLObjectType({
  name: 'UserMutation',
  fields: {
    registerUser: {
      type: UserType,
      args: {
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        interestedTopics: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: createUser,
    },

    updateUserName: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateUserName,
    },
    updateUserPicture: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        picture: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateUserPicture,
    },
    updateUserTopics: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        interestedTopics: { type: new GraphQLList(GraphQLString) },
      },
      resolve: updateUserTopics,
    },
    updateUserBio: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        bio: { type: GraphQLString },
        facebook: { type: GraphQLString },
        twitter: { type: GraphQLString },
        instagram: { type: GraphQLString },
        linkedin: { type: GraphQLString },
        website: { type: GraphQLString },
        github: { type: GraphQLString },
      },
      resolve: updateUserBio,
    },

    addNITRMail: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addNITRMail,
    },
    verifyNITRMail: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: verifyNITRMail,
    },

    newsletterSubscription: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        flag: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: newsletterSubscription,
    },

    setUserVerifiedStatus: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: setUserVerfiedStatus,
    },
    setUserBan: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        flag: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: setUserBan,
    },

    // TODO: update contributions from other schemas
    // TODO: update last poll from other schemas
    // TODO: update positions from other schemas
  },
});
