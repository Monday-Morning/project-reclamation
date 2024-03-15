const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { ArticleTypeEnumType, PublishStatusEnumType } = require('./article.enum.types');
const {
  createArticle,
  updateArticleProps,
  // updateArticleContent,
  updateArticleRestriction,
  updateArticleUsers,
  updateArticleCategories,
  updateArticleTags,
  updateArticleCover,
  updateArticleApprovalStatus,
  updateArticlePublishStatus,
  incrementViewCount,
} = require('./article.resolver');

const ArticleType = require('./article.type');

module.exports = new GraphQLObjectType({
  name: 'ArticleMutation',
  fields: {
    createArticle: {
      type: ArticleType,
      args: {
        articleType: { type: new GraphQLNonNull(ArticleTypeEnumType) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        authors: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        photographers: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        designers: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        tech: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        emails: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        categoryNumbers: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
      },
      resolve: createArticle,
    },
    updateArticleProps: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        inshort: { type: GraphQLString },
      },
      resolve: updateArticleProps,
    },
    updateArticleUsers: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        authors: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        photographers: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        designers: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
        tech: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
      },
      resolve: updateArticleUsers,
    },
    updateArticleCategories: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        categoryNumbers: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) },
      },
      resolve: updateArticleCategories,
    },
    updateArticleTags: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        tag: { type: new GraphQLNonNull(GraphQLID) },
        isAdded: { type: new GraphQLNonNull(GraphQLBoolean) },
        isAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: updateArticleTags,
    },
    updateArticleCover: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        squareRef: { type: new GraphQLNonNull(GraphQLID) },
        rectangleRef: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: updateArticleCover,
    },
    // updateArticleContent: {
    // 	type: ArticleType,
    // 	args: {
    // 		id: { type: new GraphQLNonNull(GraphQLID) },
    // 		content: { type: new GraphQLNonNull(new GraphQLList(GraphQLJSONObject)) },
    // 	},
    // 	resolve: updateArticleContent,
    // },
    updateArticleApprovalStatus: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        approvalStatus: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: updateArticleApprovalStatus,
    },
    updateArticlePublishStatus: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        publishStatus: { type: new GraphQLNonNull(PublishStatusEnumType) },
      },
      resolve: updateArticlePublishStatus,
    },
    updateArticleRestriction: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        isInstituteRestricted: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: updateArticleRestriction,
    },
    incrementViewCount: {
      type: ArticleType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: incrementViewCount,
    },
  },
});
