const { GraphQLObjectType, GraphQLString } = require('../../scalars');

module.exports = new GraphQLObjectType({
  name: 'StudentType',
  fields: () => ({
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    branch: { type: GraphQLString },
    degree: { type: GraphQLString },
  }),
});
