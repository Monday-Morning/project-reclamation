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
const { getIssueByID, listIssues } = require('./issue.resolver');

module.exports = new GraphQLObjectType({
  name: 'IssueQuery',
  fields: {
    getIssueByID: {
      description: 'Retrieves a single Issue',
      type: IssueType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The issue's mongo ID",
        },
      },
      resolve: getIssueByID,
    },
    listIssues: {
      description: 'Retrieves a list of all the Issues',
      type: new GraphQLNonNull(new GraphQLList(IssueType)),
      args: {},
      resolve: listIssues,
    },
  },
});
