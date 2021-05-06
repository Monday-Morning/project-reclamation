const UserDetailType = require('../common/userDetail.type');
// const UserType = require('../user/user.type');
// const { getUser } = require('../user/user.resolver');
const ContentType = require('../common/content.type');
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
    category: { type: new GraphQLNonNull(GraphQLInt) },
    subcategory: { type: GraphQLBoolean },
    referenceID: {
      type: GraphQLID,
      resolve: (parent) => parent.reference,
    },
    reference: {
      type: CategoryMapType,
      resolve: (parent) => getCategory(null, { id: parent.reference }),
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
      resolve: (parent) => getTag(null, { id: parent.reference }),
    },
  }),
});

const CoverMediaType = new GraphQLObjectType({
  name: 'CoverMedia',
  fields: () => ({
    squareID: { type: GraphQLID },
    square: {
      type: MediaType,
      resolve: (parent) => getMedia(null, parent.square),
    },
    rectangleID: { type: GraphQLID },
    rectangle: {
      type: MediaType,
      resolve: (parent) => getMedia(null, parent.rectangle),
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
    content: { type: new GraphQLList(ContentType) },
    inshort: { type: GraphQLString },
    authors: { type: new GraphQLList(UserDetailType) },
    tech: { type: new GraphQLList(UserDetailType) },
    category: { type: new GraphQLList(ArticleCategoryType) },
    tags: { type: GraphQLList(ArticleTagType) },
    coverMedia: { type: CoverMediaType },
    status: { type: StatusEnumType },
    isInstituteRestricted: { type: GraphQLBoolean },
    engagementCount: { type: EngagementCountType },
    readTime: { type: GraphQLInt },
    timeSpent: { type: GraphQLInt },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    // createdByUser: {
    //   type: UserType,
    //   resolve: (parent, _, context, info) => getUser(null, { id: parent.createdBy }, context, info),
    // },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    // updatedByUser: {
    //   type: UserType,
    //   resolve: (parent, _, context, info) => getUser(null, { id: parent.updatedBy }, context, info),
    // },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = ArticleType;
