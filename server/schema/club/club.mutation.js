/**
 * @module app.schema.ClubMutation
 * @description Club Mutation
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
  // GraphQLBoolean,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  //GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');
const { addClub, updateClub, deleteClub } = require('./club.resolver');
const ClubType = require('./club.type');

module.exports = new GraphQLObjectType({
  name: 'ClubMutation',
  fields: {
    addClub: {
      description: 'Adds a single club',
      type: ClubType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        instagram: { type: GraphQLString },
        facebook: { type: GraphQLString },
        twitter: { type: GraphQLString },
        logo: { type: GraphQLID },
        description: { type: GraphQLNonNull(GraphQLString) },
        facAd: { type: GraphQLString },
        society: { type: GraphQLNonNull(GraphQLString) },
        executive: { type: GraphQLList(GraphQLJSONObject) },
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
        logo: { type: GraphQLID },
        description: { type: GraphQLString },
        facAd: { type: GraphQLString },
        society: { type: GraphQLString },
        executive: { type: GraphQLList(GraphQLJSONObject) },
      },
      resolve: updateClub,
    },
    deleteClub: {
      description: 'Deletes a single club',
      type: ClubType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: deleteClub,
    },
  },
});
