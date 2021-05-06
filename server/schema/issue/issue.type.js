/**
 * @module app.schema.IssueType
 * @description IssueType
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
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publishedAt: { type: GraphQLDateTime },
    //TODO: Resolve to their respective types.
    // articles: { type: GraphQLList(ArticleType) },
    // featured: { type: GraphQLList(ArticleType) },
    // polls: { type: GraphQLList(PollType) },
    // thumbnail: { type: MediaType },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = IssueType;
