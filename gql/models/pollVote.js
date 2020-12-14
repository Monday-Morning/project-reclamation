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

module.exports = PollVote();

function PollVote() {
  return new GraphQLObjectType({
    name: 'PollVote',
    fields: () => ({
      id: { type: GraphQLID },
      user: { type: GraphQLID },
      poll: { type: GraphQLID },
      vote: { type: GraphQLInt },
    }),
  });
}
