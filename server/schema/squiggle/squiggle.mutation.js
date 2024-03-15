const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('../scalars');
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
    updateSquiggle: {
      type: SquiggleType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The squiggle's mongo ID",
        },
        newContent: { type: GraphQLString },
      },
      resolve: updateSquiggle,
    },
  },
});
