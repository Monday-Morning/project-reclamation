const {
  GraphQLObjectType,
  // GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Reaction();

function Reaction() {
  return new GraphQLObjectType({
    name: 'Reaction',
    fields: () => ({
      id: { type: GraphQLID },
      user: { type: GraphQLID },
      type: { type: GraphQLInt },
      modelRef: { type: GraphQLID },
      onModel: { type: GraphQLID },
    }),
  });
}
