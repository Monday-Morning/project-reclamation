const {
  GraphQLObjectType,
  //GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const { getPollByID, getListOfPolls } = require('./poll.resolver');
const PollType = require('./poll.type');
module.exports = new GraphQLObjectType({
  name: 'PollQuery',
  fields: {
    getPollByID: {
      type: PollType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The issue's mongo ID",
        },
      },
      resolve: getPollByID,
    },
    getListOfPolls: {
      description: 'Retrieves a list of all polls.',
      type: new GraphQLNonNull(GraphQLList(PollType)),
      args: {
        limit: {
          type: GraphQLInt,
        },
        offset: {
          type: GraphQLInt,
        },
      },
      resolve: getListOfPolls,
    },
  },
});
