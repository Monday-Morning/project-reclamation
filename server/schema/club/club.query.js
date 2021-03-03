const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const ClubType = require('./club.type');
const { getClub, listClubs, searchClubs } = require('./club.resolver');

module.exports = new GraphQLObjectType({
  name: 'ClubQuery',
  fields: {
    getClub: {
      description: 'Retrieves a single club',
      type: ClubType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "The club's mongo ID.",
        },
      },
      resolve: getClub,
    },
    listClubs: {
      type: GraphQLList(ClubType),
      args: {
        ids: {
          type: GraphQLList(GraphQLID),
          description: 'The List of club mongo IDs.',
        },
      },
      resolve: listClubs,
    },
    searchClubs: {
      description: 'Searches a club for keywords',
      type: GraphQLList(ClubType),
      args: {
        keywords: {
          description: 'The search keywords',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: searchClubs,
    },
  },
});
