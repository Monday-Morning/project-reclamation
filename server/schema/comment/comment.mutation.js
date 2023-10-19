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
  // GraphQLList,
  GraphQLString,
  GraphQLID,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { CommentParentModelEmum } = require('./comment.enum.types');
const { createComment, deleteComment, updateCommentContent, approveComment } = require('./comment.resolver');

const CommentType = require('./comment.type');

module.exports = new GraphQLObjectType({
  name: 'CommentMutation',
  fields: {
    createComment: {
      description: 'Create a comment',
      type: CommentType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
        parentID: { type: new GraphQLNonNull(GraphQLID) },
        parentType: { type: new GraphQLNonNull(CommentParentModelEmum) },
      },
      resolve: createComment,
    },
    approveComment: {
      description: 'Approve a comment',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: approveComment,
    },
    updateCommentContent: {
      description: 'Update Comment by Id',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateCommentContent,
    },
    deleteComment: {
      description: 'Delete comment by Id',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteComment,
    },
  },
});
