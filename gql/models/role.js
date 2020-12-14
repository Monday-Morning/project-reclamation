const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Role();

function Role() {
  return new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
      id: { type: GraphQLID },
      role: { type: GraphQLString },
      permissions: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      createdAt: { type: GraphQLDateTime },
      updatedAt: { type: GraphQLDateTime },
    }),
  });
}
