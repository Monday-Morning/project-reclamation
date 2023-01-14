const { GraphQLSchema } = require('../scalars');

const LiveMutation = require('./live.mutation');
const LiveQuery = require('./live.query');
const LiveType = require('./live.type');

module.exports = new GraphQLSchema({
  type: [LiveType],
  query: LiveQuery,
  mutation: LiveMutation,
});
