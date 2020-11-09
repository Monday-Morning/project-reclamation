const { GraphQLSchema } = require('graphql');
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
