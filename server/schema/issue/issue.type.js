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

const UserType = require('../user/user.type');
const { getUser } = require('../user/user.resolver');
const ArticleType = require('../article/article.type');
const { getArticle } = require('../article/article.resolver');

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
      resolve: (parent, _args, context) => getArticle(null, { id: parent.articles }, context),
    },
    featuredIDs: {
      type: new GraphQLList(GraphQLID),
      resolve: (parent) => parent.featured,
    },
    featured: {
      type: new GraphQLList(ArticleType),
      resolve: (parent, _args, context) => getArticle(null, { id: parent.featured }, context),
    },
    // polls: { type: GraphQLList(PollType) },
    thumbnail: { type: MediaType },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    createdByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.createdBy }, context, info),
    },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    updatedByUser: {
      type: UserType,
      resolve: (parent, _, context, info) => getUser(null, { id: parent.updatedBy }, context, info),
    },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = IssueType;
