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
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');
const { createComment, updateCommentAuthor, deleteComment } = require('./comment.resolver');

const CommentType = require('./comment.type'); 

module.exports = new GraphQLObjectType({
  name: 'CommentMutation',
  fields: {
    createComment: {
      description: 'Create a comment',
      type: CommentType,
      args: {
        content: { type: new GraphQLNonNull(new GraphQLList(GraphQLJSONObject)) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
        parentID: { type: new GraphQLNonNull(GraphQLID) },
        parentType: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: createComment,
    },
    updateCommentContent: {
      description: 'Update Comment by Id',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(new GraphQLList(GraphQLJSONObject)) },
      },
      resolve: null,
    },
    updateCommentAuthor: {
      description: 'Update Comment by Id',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: updateCommentAuthor,
    },
    deleteComment: {
      description: 'Delete comment by Id',
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        authorID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteComment,
    }
  } 
})

