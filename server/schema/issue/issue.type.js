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
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const ArticleType = require('../article/article.type');
const { getListOfArticles } = require('../article/article.resolver');
const ImageType = require('../common/image.type');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    thumbnail: { type: ImageType },
    description: { type: GraphQLString },

    isPublished: { type: GraphQLBoolean },
    startDate: { type: GraphQLDateTime },
    endDate: { type: GraphQLDateTime },

    articleIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.articles,
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context, info) =>
        parent.articles instanceof Array
          ? getListOfArticles(parent, { ids: parent.articles, limit: parent.articles.length }, context, info)
          : null,
    },

    featuredIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.featured,
    },
    featured: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context, info) =>
        parent.articles instanceof Array
          ? getListOfArticles(parent, { ids: parent.featured, limit: parent.articles.length }, context, info)
          : null,
    },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = IssueType;
