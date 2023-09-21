const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('../scalars');
const { createSquiggle, updateSquiggle } = require('./squiggle.resolver');

const SquiggleType = require('./squiggle.type');

module.exports = new GraphQLObjectType({
  name: 'SquiggleMutation',
  fields: {
    createSquiggle: {
      type: SquiggleType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: createSquiggle,
    },
  },
});
