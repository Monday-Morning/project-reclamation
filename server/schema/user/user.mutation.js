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
// const FirebaseUserType = require('./firebaseUser.type');
const {
  createUser,
  setUserBan,
  // updateUserName,
  updateUserProfilePicture,
  updateUserTopics,
  updateUserBio,
  addNITRMail,
  newsletterSubscription,
  setUserAccountType,
  // setUserRoles,
} = require('./user.resolver');
const { AccountTypeEnumType } = require('./user.enum.types');

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
    // updateUserName: {
    //   type: UserType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) },
    //     firstName: { type: new GraphQLNonNull(GraphQLString) },
    //     lastName: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve: updateUserName,
    // },
    updateUserTopics: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        interestedTopics: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
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
    updateUserProfilePicture: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        store: { type: GraphQLInt },
        storePath: { type: new GraphQLNonNull(GraphQLString) },
        blurhash: { type: GraphQLString },
      },
      resolve: updateUserProfilePicture,
    },
    addNITRMail: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        nitrMail: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addNITRMail,
    },

    newsletterSubscription: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        flag: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: newsletterSubscription,
    },

    /** Admin APIs */
    setUserAccountType: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        accountType: { type: new GraphQLNonNull(AccountTypeEnumType) },
      },
      resolve: setUserAccountType,
    },
    setUserBan: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        flag: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: setUserBan,
    },
    // setUserRoles: {
    //   type: FirebaseUserType,
    //   args: {
    //     email: {
    //       description: "The user's email id",
    //       type: new GraphQLNonNull(GraphQLString),
    //     },
    //     roles: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    //   },
    //   resolve: setUserRoles,
    // },

    // TODO: update contributions from other schemas
    // TODO: update last poll from other schemas
    // TODO: update positions from other schemas
  },
});
