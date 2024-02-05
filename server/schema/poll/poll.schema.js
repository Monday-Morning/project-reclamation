/**
 * @module app.schema.poll
 * @description poll Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.PollQuery
 * @requires module:app.schema.PollMutation
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
const PollMutation = require('./poll.mutation');
const pollQuery = require('./poll.query');
const PollType = require('./poll.type');
module.exports = new GraphQLSchema({
  types: [PollType],
  query: pollQuery,
  mutation: PollMutation,
});
