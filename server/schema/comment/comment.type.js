const {
  GraphQLObjectType,
  // GraphQLScalarType,
  GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const ArticleType = require('../article/article.type');
const { getArticleByID } = require('../article/article.resolver');
const ContentType = require('../common/content.type');
const { getCommentById } = require('./comment.resolver');
const { getUser } = require('../user/user.resolver');
const UserType = require('../user/user.type');

const ParentType = new GraphQLObjectType({
  name: 'Parent',
  fields: () => ({
    model: { type: GraphQLString },
    reference: { type: GraphQLID },

    parent: {
      // eslint-disable-next-line no-use-before-define
      type: ParentUniontype,
      resolve: (parent, _args, context, info) =>
        parent.reference
          ? parent.model === 'Article'
            ? getArticleByID(parent, { id: parent.reference }, context, info)
            : getCommentById(parent, { id: parent.reference }, context, info)
          : null,
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: GraphQLString },
    reference: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: (parent, _args, context, info) =>
        parent.reference ? getUser(parent, { id: parent.reference }, context, info) : null,
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },

    content: { type: new GraphQLList(new GraphQLNonNull(ContentType)) },

    author: {
      type: AuthorType,
    },

    parent: { type: ParentType },

    createdAt: { type: GraphQLDateTime },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

const ParentUniontype = new GraphQLUnionType({
  name: 'ParentUnion',
  description: 'Union of article and comment for parent of comment',
  types: [ArticleType, CommentType],
  resolveType: (value) => (value.categories ? ArticleType : CommentType),
});

module.exports = CommentType;
