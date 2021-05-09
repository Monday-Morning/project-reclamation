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

const MediaType = require('../media/media.type');
const { getMedia } = require('../media/media.resolver');
const ArticleType = require('../article/article.type');
const { listArticle } = require('../article/article.resolver');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publishedAt: { type: GraphQLDateTime },
    articleIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.articles,
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context) =>
        parent.articles ? listArticle(null, { ids: parent.articles }, context) : null,
    },
    featuredIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.featured,
    },
    featured: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context) =>
        parent.articles ? listArticle(null, { ids: parent.featured }, context) : null,
    },
    // polls: { type: GraphQLList(PollType) },
    thumbnailID: {
      type: GraphQLID,
      resolve: (parent) => parent.thumbnail,
    },
    thumbnail: {
      type: MediaType,
      resolve: (parent, _args, context) =>
        parent.thumbnail ? getMedia(null, { id: parent.thumbnail }, context) : null,
    },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = IssueType;
