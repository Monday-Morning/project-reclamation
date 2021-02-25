/**
 * @module app.schema.UserQuery
 * @description User Query
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
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const { getUser, listUsers, searchUsers } = require('./user.resolver');
const { AccountTypeEnumType } = require('./user.enum.types');

const UserType = require('./user.type');

module.exports = new GraphQLObjectType({
  name: 'UserQuery',
  fields: {
    getUser: {
      description: 'Retrieves a single user.',
      type: UserType,
      args: {
        id: {
          description: "The user's mongo ID.",
          type: GraphQLID,
        },
        email: {
          description: "The user's email ID",
          type: GraphQLString,
        },
      },
      resolve: getUser,
    },
    listUsers: {
      description: 'Retrieves a list of users.',
      type: new GraphQLList(UserType),
      args: {
        ids: {
          description: 'The list of user mongo IDs',
          type: new GraphQLList(GraphQLID),
        },
        emails: {
          description: 'The list of user email IDs',
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: listUsers,
    },
    searchUsers: {
      description: 'Searches for a user using keywords.',
      type: new GraphQLList(UserType),
      args: {
        keywords: {
          description: 'The search keywords.',
          type: new GraphQLNonNull(GraphQLString),
        },
        accountType: {
          description: "The user's account type or verification status",
          type: AccountTypeEnumType,
        },
      },
      resolve: searchUsers,
    },
  },
});
