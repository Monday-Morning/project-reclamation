/**
 * @module app.schema.PollMutation
 * @description Poll Mutation
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const {
  GraphQLObjectType,
  //GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  //GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  //GraphQLDateTime,
  GraphQLTime,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const PollType = require('./poll.type');
const { createPoll, updatePollProp, updatePollArticles, removePoll } = require('./poll.resolver');
module.exports = new GraphQLObjectType({
  name: 'PollMutation',
  fields: {
    createPoll: {
      description: 'adds a new poll',
      type: PollType,
      args: {
        question: { type: new GraphQLNonNull(GraphQLString) },
        options: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        optionsCount: { type: new GraphQLNonNull(GraphQLInt) },
        totalVotes: { type: GraphQLInt },
        expiry: { type: GraphQLTime },
        article: { type: new GraphQLList(GraphQLID) },
        createdBy: { type: GraphQLID },
      },
      resolve: createPoll,
    },
    updatePollProp: {
      description: "updates a poll's properties",
      type: PollType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        question: { type: GraphQLString },
        options: { type: GraphQLList(GraphQLString) },
        totalVotes: { type: GraphQLInt },
        optionsCount: { type: GraphQLInt },
      },
      resolve: updatePollProp,
    },
    updatePollArticles: {
      description: "updates a poll's articles",
      type: PollType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        article: { type: new GraphQLList(GraphQLID) },
      },
      resolve: updatePollArticles,
    },
    removePoll: {
      description: 'deletes a poll by ID',
      type: PollType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: removePoll,
    },
  },
});
