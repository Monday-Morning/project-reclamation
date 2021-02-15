const { GraphQLSchema } = require('graphql');
const Query = require('./query');
const Mutation = require('./mutation');
const Subscription = require('./subscription');

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
});
