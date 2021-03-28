/**
 * @module app.schema.ClubMutation
 * @description Club Mutation
 *
 * @requires module:app.schema.scalars
 *
 * @version v1
 * @since 0.1.0
 */

const { GraphQLList } = require('graphql');
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
const { addClub, updateClub, updateClubExecutive } = require('./club.resolver');
const ClubType = require('./club.type');
const ExecutiveType = require('./executive.type');

module.exports = new GraphQLObjectType({
  name: 'ClubMutation',
  fields: {
    addClub: {
      description: 'Adds a single club',
      type: ClubType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        website: { type: GraphQLString },
        instagram: { type: GraphQLString },
        facebook: { type: GraphQLString },
        twitter: { type: GraphQLString },
        logo: { type: GraphQLID },
        description: { type: GraphQLString },
        facAd: { type: GraphQLString },
        society: { type: GraphQLString },
        executive: { type: GraphQLList(ExecutiveType) },
      },
      resolve: addClub,
    },
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
        description: { type: GraphQLString },
        facAd: { type: GraphQLString },
        society: { type: GraphQLString },
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
