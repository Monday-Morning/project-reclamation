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
  GraphQLList,
  GraphQLBoolean,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  //GraphQLJSON,
  //GraphQLJSONObject,
} = require('../scalars');
const { createIssue, updateIssueProps, updateIssueArticles, removeIssue } = require('./issue.resolver');
const IssueType = require('./issue.type');

module.exports = new GraphQLObjectType({
  name: 'IssueMutation',
  fields: {
    createIssue: {
      description: 'Adds a new issue',
      type: IssueType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        startDate: { type: new GraphQLNonNull(GraphQLDateTime) },
        endDate: { type: new GraphQLNonNull(GraphQLDateTime) },
        articles: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        featured: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        isPublished: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: createIssue,
    },
    updateIssueProps: {
      description: 'Updates an issue',
      type: IssueType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        startDate: { type: new GraphQLNonNull(GraphQLDateTime) },
        endDate: { type: new GraphQLNonNull(GraphQLDateTime) },
      },
      resolve: updateIssueProps,
    },
    updateIssueArticles: {
      description: "Updates an issue's articles",
      type: IssueType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        articles: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        featured: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
      },
      resolve: updateIssueArticles,
    },
    removeIssue: {
      description: 'Deletes an issue by ID',
      type: IssueType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: removeIssue,
    },
  },
});
