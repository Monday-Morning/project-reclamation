const { GraphQLString, GraphQLList } = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLDateTime, GraphQLInt } = require('../scalars');

const ExecutiveType = new GraphQLObjectType({
  name: 'Executive',
  fields: () => ({
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
  }),
});
const ClubType = new GraphQLObjectType({
  name: 'Club',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    website: { type: GraphQLString },
    instagram: { type: GraphQLString },
    facebook: { type: GraphQLString },
    twitter: { type: GraphQLString },
    logo: { type: GraphQLString },
    //TODO: Mention the type of array for executive
    executive: { type: GraphQLList(ExecutiveType) },
    society: { type: GraphQLString },
    description: { type: GraphQLString },
    facAd: { type: GraphQLString },
    createdAt: { type: GraphQLID },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = ClubType;
