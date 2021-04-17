/**
 * @module app.schema.EventType
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
  //GraphQLSchema,
  GraphQLID,
  //GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    startTS: { type: GraphQLDateTime },
    endTS: { type: GraphQLDateTime },
    poster: { type: GraphQLID },
    type: { type: GraphQLInt },
    host: { type: GraphQLID },
    url: { type: GraphQLString },
    venue: { type: GraphQLString },
    hits: { type: GraphQLInt },
    createdAt: { type: GraphQLID },
    createdBy: { type: GraphQLID },
    updatedAt: { type: GraphQLDateTime },
    updatedBy: { type: GraphQLID },
    schemaVersion: { type: GraphQLInt },
  }),
});

module.exports = EventType;
