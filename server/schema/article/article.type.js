const UserDetailType = require('../common/userDetail.type');
const UserType = require('../user/user.type');
const { getUser } = require('../user/user.resolver');
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

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    category: { type: new GraphQLNonNull(GraphQLInt) },
    subcategory: { type: GraphQLBoolean },
    referenceID: { type: GraphQLID },
    // TODO: Resolve to CategoryMapType
    /*
    reference: {
      type: CategoryMapType,
      resolve: async (parent, args, context, info) => {},
    },
		*/
  }),
});

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    name: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    referenceID: { type: GraphQLID },
    // TODO: Resolve to TagType
    /*
    reference: {
      type: TagType,
      resolve: async (parent, args, context, info) => {},
    },
		*/
  }),
});

const CoverMediaType = new GraphQLObjectType({
  name: 'CoverMedia',
  fields: () => ({
    squareID: { type: GraphQLID },
    // TODO: Resolve to MediaType
    /*
		square: {
			type: MediaType,
			resolve: async (parent, args, context, info) => {},
		}
		*/
    rectangleID: { type: GraphQLID },
    // TODO: Resolve to MediaType
    /*
		rectangle: {
			type: MediaType,
			resolve: async (parent, args, context, info) => {},
		}
		*/
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
    category: { type: new GraphQLList(CategoryType) },
    tags: { type: GraphQLList(TagType) },
    coverMedia: { type: CoverMediaType },
    status: { type: StatusEnumType },
    isInstituteRestricted: { type: GraphQLBoolean },
    engagementCount: { type: EngagementCountType },
    readTime: { type: GraphQLInt },
    timeSpent: { type: GraphQLInt },

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

module.exports = ArticleType;
