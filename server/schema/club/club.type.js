/**
 * @module app.schema.ClubType
 * @description User Type
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
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const ExecutiveType = require('./executive.type');

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
