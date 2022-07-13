const { GraphQLInputObjectType, GraphQLString } = require('../../scalars');

module.exports = new GraphQLInputObjectType({
  name: 'StudentInfoInput',
  fields: () => ({
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    branch: { type: GraphQLString },
    degree: { type: GraphQLString },
  }),
});
