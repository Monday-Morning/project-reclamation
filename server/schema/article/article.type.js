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
const { ArticleTypeEnumType, PublishStatusEnumType } = require('./article.enum.types');
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
      resolve: (parent, _args, context, info) =>
        parent?.reference ? getCategory(parent, { id: parent.reference }, context, info) : null,
    },
  }),
});

const ArticleTagType = new GraphQLObjectType({
  name: 'ArticleTag',
  fields: () => ({
    name: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    referenceID: {
      type: GraphQLID,
      resolve: (parent) => parent.reference,
    },
    reference: {
      type: TagType,
      resolve: (parent, _args, context, info) =>
        parent?.reference ? getTag(parent, { id: parent.reference }, context, info) : null,
    },
  }),
});

const CoverMediaType = new GraphQLObjectType({
  name: 'CoverMedia',
  fields: () => ({
    squareID: { type: GraphQLID, resolve: (parent) => parent.square },
    square: {
      type: MediaType,
      resolve: (parent, _args, context, info) =>
        parent.square ? getMedia(parent, { id: parent.square }, context, info) : null,
    },
    rectangleID: { type: GraphQLID, resolve: (parent) => parent.rectangle },
    rectangle: {
      type: MediaType,
      resolve: (parent, _args, context, info) =>
        parent.rectangle ? getMedia(parent, { id: parent.rectangle }, context, info) : null,
    },
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

    authors: { type: new GraphQLList(UserDetailType), resolve: (parent) => parent.users.filter((u) => u.team === 0) },
    photographers: {
      type: new GraphQLList(UserDetailType),
      resolve: (parent) => parent.users.filter((u) => u.team === 1 || u.team === 5),
    },
    designers: { type: new GraphQLList(UserDetailType), resolve: (parent) => parent.users.filter((u) => u.team === 2) },
    tech: { type: new GraphQLList(UserDetailType), resolve: (parent) => parent.users.filter((u) => u.team === 3) },

    categoryNumbers: {
      type: new GraphQLList(GraphQLInt),
      resolve: (parent) => parent.categories.map((_cat) => _cat.number),
    },
    categories: { type: new GraphQLList(ArticleCategoryType) },

    tagNames: {
      type: new GraphQLList(GraphQLString),
      resolve: (parent) => parent.tags.filter((_tag) => !_tag.isAdmin).map((_tag) => _tag.name),
    },
    tags: { type: new GraphQLList(ArticleTagType), resolve: (parent) => parent.tags.filter((_tag) => !_tag.isAdmin) },
    adminTags: {
      type: new GraphQLList(ArticleTagType),
      resolve: (parent) => parent.tags.filter((_tag) => _tag.isAdmin),
    },

    coverMedia: { type: CoverMediaType },

    approvalStatus: { type: GraphQLBoolean },
    publishStatus: { type: PublishStatusEnumType },
    isInstituteRestricted: { type: GraphQLBoolean },

    reactions: { type: GraphQLInt, resolve: (parent) => parent.engagement.reactions },
    comments: { type: GraphQLInt, resolve: (parent) => parent.engagement.comments },
    bookmarks: { type: GraphQLInt, resolve: (parent) => parent.engagement.bookmarks },
    views: { type: GraphQLInt, resolve: (parent) => parent.engagement.views },
    hits: { type: GraphQLInt, resolve: (parent) => parent.engagement.hits },

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
