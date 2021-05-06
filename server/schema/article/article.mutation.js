const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');
const { ArticleTypeEnumType, StatusEnumType } = require('./article.enum.types');
const {
  createArticle,
  updateArticleProps,
  updateArticleContent,
  updateArticleCoverMedia,
  updateArticleStatus,
  updateArticleRestriction,
  incrementEngagementCount,
} = require('./article.resolver');

const ArticleType = require('./article.type');

const EngagementEnumType = new GraphQLEnumType({
  name: 'EngagementEnum',
  values: {
    REACTIONS: { value: 0 },
    COMMENTS: { value: 1 },
    BOOKMARKS: { value: 2 },
    VIEWS: { value: 3 },
    HITS: { value: 4 },
  },
});

module.exports = new GraphQLObjectType({
  name: 'ArticleMutation',
  fields: {
    createArticle: {
      type: ArticleType,
      args: {
        articleType: { type: new GraphQLNonNull(ArticleTypeEnumType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        authors: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        tech: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        categories: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
      },
      resolve: createArticle,
    },
    updateArticleProps: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        inshort: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLID) },
        tags: { type: new GraphQLList(GraphQLID) },
      },
      resolve: updateArticleProps,
    },
    updateArticleContent: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(new GraphQLList(GraphQLJSONObject)) },
      },
      resolve: updateArticleContent,
    },
    updateArticleCoverMedia: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        squareRef: { type: new GraphQLNonNull(GraphQLID) },
        rectangleRef: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: updateArticleCoverMedia,
    },
    updateArticleStatus: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: new GraphQLNonNull(StatusEnumType) },
      },
      resolve: updateArticleStatus,
    },
    updateArticleRestriction: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        flag: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: updateArticleRestriction,
    },
    incrementEngagementCount: {
      type: ArticleType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        engagement: { type: GraphQLNonNull(EngagementEnumType) },
      },
      resolve: incrementEngagementCount,
    },
  },
});
