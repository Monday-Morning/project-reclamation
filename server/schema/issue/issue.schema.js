/**
 * @module app.schema.Issue
 * @description Issue Schema
 *
 * @requires module:app.schema.scalars
 * @requires module:app.schema.IssueQuery
 * @requires module:app.schema.IssueMutation
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
const IssueMutation = require('./issue.mutation');
const IssueQuery = require('./issue.query');

module.exports = new GraphQLSchema({
  query: IssueQuery,
  mutation: IssueMutation,
});
