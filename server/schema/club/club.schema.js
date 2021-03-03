const {
  // GraphQLObjectType,
  // GraphQLString,
  GraphQLSchema,
  // GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const ClubMutation = require('./club.mutation');
const ClubQuery = require('./club.query');

module.exports = new GraphQLSchema({
  query: ClubQuery,
  mutation: ClubMutation,
});
