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
  // GraphQLString,
  // GraphQLSchema,
  // GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const UserType = require('./user.type');

module.exports = new GraphQLObjectType({
  name: 'UserMutation',
  fields: {
    user: {
      type: UserType,
    },
  },
});
