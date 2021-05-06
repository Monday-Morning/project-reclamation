/**
 * @module app.schema.IssueQuery
 * @description Issue Query
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const IssueType = require('./issue.type');

module.exports = new GraphQLObjectType({
  name: 'IssueQuery',
  fields: {
    getIssueByID: {
      description: 'Retrieves a single Issue',
      type: IssueType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "The issue's mongo ID",
        },
      },
      resolve: GetIssueByID,
    },
    listIssues: {
      description: 'Retrieves a list of all the Issues',
      type: GraphQLList(IssueType),
      args: {},
      resolve: listIssues,
    },
  },
});
