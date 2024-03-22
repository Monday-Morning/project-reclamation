/**
 * @module app.schema.PollType
 * @description PollType
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  //GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const PollType = new GraphQLObjectType({
  name: 'Poll',
  fields: () => ({
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    options: { type: GraphQLList(GraphQLString) },
    optionsCount: { type: GraphQLInt },
    totalVotes: { type: GraphQLInt },
    expiry: { type: GraphQLDateTime },
    article: { type: GraphQLID },
    createdBy: { type: GraphQLID },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});
module.exports = PollType;
