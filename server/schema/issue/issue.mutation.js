/**
 * @module app.schema.IssueMutation
 * @description Issue Mutation
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
  //GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  //GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');
const { addIssue, updateIssue, deleteIssue } = require('./issue.resolver');
const IssueType = require('./issue.type');

module.exports = new GraphQLObjectType({
  name: 'IssueMutation',
  fields: {
    addIssue: {
      description: 'Adds a single issue',
      type: IssueType,
      args: {
        name: { type: GraphQLString },
        // articles: { type: GraphQLList(GraphQLID) },
        // featured: { type: GraphQLList(GraphQLID) },
        // polls: { type: GraphQLList(PollType) },
        // thumbnail: { type: MediaType },
        description: { type: GraphQLString },
      },
      resolve: addIssue,
    },
    updateIssue: {
      description: 'Updates a single issue',
      type: IssueType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        // articles: { type: GraphQLList(GraphQLID) },
        // featured: { type: GraphQLList(GraphQLID) },
        // polls: { type: GraphQLList(PollType) },
        // thumbnail: { type: MediaType },
        description: { type: GraphQLString },
      },
      resolve: updateIssue,
    },
    deleteIssue: {
      description: 'Deletes a single issue by id',
      type: IssueType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
    },
    resolve: deleteIssue,
  },
});
