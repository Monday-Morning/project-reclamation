/**
 * @module app.schema.Event
 * @description Event  Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.Event Query
 * @requires module:app.schema.Event Mutation
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
const EventMutation = require('./event.mutation');
const EventQuery = require('./event.query');

module.exports = new GraphQLSchema({
  query: EventQuery,
  mutation: EventMutation,
});
