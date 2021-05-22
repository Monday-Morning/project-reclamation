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
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const UserDetailType = require('../common/userDetail.type');
const ContentType = require('../common/content.type');
const { ArticleTypeEnumType, StatusEnumType } = require('./article.enum.types');
const CategoryMapType = require('../categoryMap/categoryMap.type');
const { getCategory } = require('../categoryMap/categoryMap.resolver');
const TagType = require('../tag/tag.type');
const { getTag } = require('../tag/tag.resolver');
const MediaType = require('../media/media.type');
const { getMedia } = require('../media/media.resolver');

const ArticleCategoryType = new GraphQLObjectType({
  name: 'ArticleCategory',
  fields: () => ({
    number: { type: new GraphQLNonNull(GraphQLInt) },
    subcategory: { type: GraphQLBoolean },
    referenceID: {
      type: GraphQLID,
      resolve: (parent) => parent.reference,
    },
    reference: {
      type: CategoryMapType,
      resolve: (parent, _args, context) =>
        parent.reference ? getCategory(null, { id: parent.reference }, context) : null,
    },
  }),
});

const ArticleTagType = new GraphQLObjectType({
  name: 'ArticleTag',
  fields: () => ({
    name: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    referenceID: { type: GraphQLID },
    reference: {
      type: TagType,
      resolve: (parent, _args, context) => (parent.reference ? getTag(null, { id: parent.reference }, context) : null),
    },
  }),
});

const CoverMediaType = new GraphQLObjectType({
  name: 'CoverMedia',
  fields: () => ({
    squareID: { type: GraphQLID },
    square: {
      type: MediaType,
      resolve: (parent, _args, context) => (parent.square ? getMedia(null, { id: parent.square }, context) : null),
    },
    rectangleID: { type: GraphQLID },
    rectangle: {
      type: MediaType,
      resolve: (parent, _args, context) =>
        parent.rectangle ? getMedia(null, { id: parent.rectangle }, context) : null,
    },
  }),
});

const EngagementCountType = new GraphQLObjectType({
  name: 'EngagementCount',
  fields: () => ({
    reactions: { type: GraphQLInt },
    comments: { type: GraphQLInt },
    bookmarks: { type: GraphQLInt },
    views: { type: GraphQLInt },
    hits: { type: GraphQLInt },
  }),
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    articleType: { type: ArticleTypeEnumType },
    title: { type: GraphQLString },
    // TODO: switch from detailed content type to json object
    content: { type: new GraphQLList(ContentType) },
    inshort: { type: GraphQLString },
    authors: { type: new GraphQLList(UserDetailType) },
    tech: { type: new GraphQLList(UserDetailType) },
    categories: { type: new GraphQLList(ArticleCategoryType) },
    tags: { type: GraphQLList(ArticleTagType) },
    coverMedia: { type: CoverMediaType },
    status: { type: StatusEnumType },
    isInstituteRestricted: { type: GraphQLBoolean },
    engagementCount: { type: EngagementCountType },
    readTime: { type: GraphQLInt },
    timeSpent: { type: GraphQLInt },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = ArticleType;
