const { GraphQLSchema } = require("graphql");
const CommentQuery = require('./comment.query');
const CommentMutation = require('./comment.mutation');

module.exports = new GraphQLSchema({
  query: CommentQuery,
  mutation: CommentMutation,
})