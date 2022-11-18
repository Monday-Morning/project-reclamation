const { GraphQLSchema } = require('../scalars');

const MediaMutation = require('./media.mutation');
const MediaQuery = require('./media.query');
const MediaType = require('./media.type');

module.exports = new GraphQLSchema({
  types: [MediaType],
  query: MediaQuery,
  mutation: MediaMutation,
});
