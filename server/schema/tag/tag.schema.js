const { GraphQLSchema } = require('../scalars');
const TagQuery = require('./tag.query');
const TagMutation = require('./tag.mutation');
const TagType = require('./tag.type');

module.exports = new GraphQLSchema({
  types: [TagType],
  query: TagQuery,
  mutation: TagMutation,
});
