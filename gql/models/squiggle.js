const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Squiggle();

function Squiggle() {
  return new GraphQLObjectType({
    name: 'Squiggle',
    fields: () => ({
      id: { type: GraphQLID },
      content: { type: GraphQLString },
      important: { type: GraphQLBoolean },
    }),
  });
}
