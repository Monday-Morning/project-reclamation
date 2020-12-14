const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Holiday();

function Holiday() {
  return new GraphQLObjectType({
    name: 'Internship',
    fields: () => ({
      id: { type: GraphQLID },
      start: { type: GraphQLDate },
      end: { type: GraphQLDate },
      name: { type: GraphQLString },
    }),
  });
}
