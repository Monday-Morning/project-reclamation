const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

module.exports = Internship();

function Internship() {
  return new GraphQLObjectType({
    name: 'Internship',
    fields: () => ({
      id: { type: GraphQLID },
      InternYear: { type: GraphQLInt },
      student: { type: GraphQLID },
      studentYear: { type: GraphQLInt },
      organization: { type: GraphQLString },
      duration: { type: GraphQLInt },
      applyReactions: { type: GraphQLString },
      experience: { type: GraphQLString },
      approved: { type: GraphQLBoolean },
    }),
  });
}
