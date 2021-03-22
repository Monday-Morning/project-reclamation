/**
 * @module app.schema.Club
 * @description Club Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.ClubQuery
 * @requires module:app.schema.ClubMutation
 *
 * @version v1
 * @since 0.1.0
 */

const {
  // GraphQLObjectType,
  // GraphQLString,
  GraphQLSchema,
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
const ClubMutation = require('./club.mutation');
const ClubQuery = require('./club.query');

module.exports = new GraphQLSchema({
  query: ClubQuery,
  mutation: ClubMutation,
});
