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

const ArticleType = require('../article/article.type');
const { getArticlesByID } = require('../article/article.resolver');

const ThumbnailType = new GraphQLObjectType({
  name: 'Thumbnail',
  fields: () => ({
    storePath: { type: GraphQLString },
    blurhash: { type: GraphQLString },
  }),
});

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
        parent.articles ? getArticlesByID(null, { ids: parent.articles }, context) : null,
    },
    featuredIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.featured,
    },
    featured: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context) =>
        parent.articles ? getArticlesByID(null, { ids: parent.featured }, context) : null,
    },
    // polls: { type: GraphQLList(PollType) },
    thumbnail: { type: ThumbnailType },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = IssueType;
