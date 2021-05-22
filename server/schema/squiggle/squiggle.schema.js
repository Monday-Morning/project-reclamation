/**
 * @module app.schema.Squiggle
 * @description Squiggle Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.SquiggleQuery
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

const SquiggleQuery = require('./squiggle.query');

module.exports = new GraphQLSchema({
  query: SquiggleQuery,
});
