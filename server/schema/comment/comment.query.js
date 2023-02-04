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
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { getListOfComments, getCommentById, countOfComments } = require('./comment.resolver');

const CommentType = require('./comment.type');

module.exports = new GraphQLObjectType({
  name: 'CommentQuery',
  fields: {
    getListOfComments: {
      description: 'Retrieves comments for given list of ids (default all) in descending order of creation time',
      type: new GraphQLList(new GraphQLNonNull(CommentType)),
      args: {
        ids: {
          description: 'List of Ids of comments to be retrieved',
          type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
        },
        limit: {
          description: 'No of Comments to be retrieved',
          type: GraphQLInt,
        },
        offset: {
          description: 'No of Comments to be skipped | pagination',
          type: GraphQLInt,
        },
      },
      resolve: getListOfComments,
    },
    getCommentById: {
      description: 'Retrieves single comment based on id',
      type: CommentType,
      args: {
        id: {
          description: 'The id of comment to be retrieved',
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: getCommentById,
    },
    countOfCommentsByParent: {
      description: 'The number of comments on a article/comment',
      type: GraphQLInt,
      args: {
        id: {
          description: 'Id of article or comment',
          type: new GraphQLNonNull(GraphQLID),
        },
        parentType: {
          description: 'Type of parent',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: countOfComments,
    },
  },
});
