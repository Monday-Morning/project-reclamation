const { GraphQLSchema } = require('../scalars');

const mediaMutation = require('./media.mutation');
const MediaQuery = require('./media.query');
const MediaType = require('./media.type');

module.exports = new GraphQLSchema({
  types: [MediaType],
  query: MediaQuery,
  mutation: mediaMutation,
});
