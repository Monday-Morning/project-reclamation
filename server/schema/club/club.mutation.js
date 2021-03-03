const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLSchema,
  GraphQLID,
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
const { updateClub, updateClubExecutive } = require('./club.resolver');
const ClubType = require('./club.type');
const ExecutiveType = require('./executive.type');

module.exports = new GraphQLObjectType({
  name: 'ClubMutation',
  fields: {
    updateClub: {
      description: 'Updates a single club',
      type: ClubType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        website: { type: GraphQLString },
        instagram: { type: GraphQLString },
        facebook: { type: GraphQLString },
        twitter: { type: GraphQLString },
        logo: { type: GraphQLString },

        society: { type: GraphQLString },
        description: { type: GraphQLString },
        facAd: { type: GraphQLString },
      },
      resolve: updateClub,
    },
    updateClubExecutive: {
      type: ExecutiveType,
      args: {
        user: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        picture: {
          type: GraphQLID,
        },
        nitrMail: {
          type: GraphQLString,
        },
        designation: {
          type: GraphQLString,
        },
      },
      resolve: updateClubExecutive,
    },
  },
});
