const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Album();

function Album() {
  return new GraphQLObjectType({
    name: 'Album',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      tags: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      slug: { type: GraphQLString },
      cover: { type: GraphQLID },
      hits: { type: GraphQLInt },
      createdAt: { type: GraphQLDateTime },
      updatedAt: { type: GraphQLDateTime },
    }),
  });
}
