const { GraphQLInputObjectType, GraphQLString, GraphQLID } = require('../scalars');

const userDetailInput = new GraphQLInputObjectType({
  name: 'UserDetailInputType',
  fields: () => ({
    name: { type: GraphQLString },
    details: { type: GraphQLID },
  }),
});

module.exports = userDetailInput;
