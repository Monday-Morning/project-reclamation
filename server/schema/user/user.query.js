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
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      resolve: getUser,
    },
    listUsers: {
      type: new GraphQLList(UserType),
      args: {
        ids: { type: new GraphQLList(GraphQLID) },
        emails: { type: new GraphQLList(GraphQLString) },
      },
      resolve: listUsers,
    },
    searchUsers: {
      type: new GraphQLList(UserType),
      args: {
        searchParam: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: AccountTypeEnumType }, // Verified Type
      },
      resolve: searchUsers,
    },
  },
});
