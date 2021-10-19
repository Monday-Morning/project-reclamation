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
  //GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const IssueType = require('./issue.type');
const { getIssueByID, getLatestIssues, getListOfIssues } = require('./issue.resolver');

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
    getLatestIssues: {
      description: 'Retrieves the latest issues.',
      type: new GraphQLList(IssueType),
      args: {
        onlyPublished: {
          description: 'Whether to only retrieve published issues.',
          type: GraphQLBoolean,
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: getLatestIssues,
    },
    getListOfIssues: {
      description: 'Retrieves a list of all the Issues',
      type: new GraphQLNonNull(new GraphQLList(IssueType)),
      args: {
        id: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
          description: 'The mongo IDs of issues',
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: getListOfIssues,
    },
  },
});
