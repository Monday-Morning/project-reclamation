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
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Forum();

function Forum() {
  return new GraphQLObjectType({
    name: 'Forum',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      media: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
      album: {
        type: GraphQLList(GraphQLObjectType),
        async resolve(parent, args) {
          //code to be written
        },
      },
    }),
  });
}
