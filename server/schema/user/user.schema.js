/**
 * @module app.schema.User
 * @description User Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.UserQuery
 * @requires module:app.schema.UserMutation
 *
 * @version v1
 * @since 0.1.0
 */

const { GraphQLSchema } = require('../scalars');
const UserQuery = require('./user.query');
const UserMutation = require('./user.mutation');
const UserType = require('./user.type');

module.exports = new GraphQLSchema({
  types: [UserType],
  query: UserQuery,
  mutation: UserMutation,
});
