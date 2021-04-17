/**
 * @module app.schema.EventMutation
 * @description Event Mutation
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
  GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  //GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');
const { createEvent, updateEvent } = require('./event.resolver');
const EventType = require('./event.type');

module.exports = new GraphQLObjectType({
  name: 'EventMutation',
  fields: {
    createEvent: {
      description: 'Creates an event',
      type: EventType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        startTS: { type: GraphQLNonNull(GraphQLDateTime) },
        endTS: { type: GraphQLNonNull(GraphQLDateTime) },
        poster: { type: GraphQLID },
        type: { type: GraphQLInt, description: '0- Club, 1- Institute, 2- Fest, 3- Holiday' },
        host: { type: GraphQLID },
        url: { type: GraphQLString },
        venue: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: createEvent,
    },
    updateEvent: {
      description: 'Updates a pre-existing event',
      type: EventType,
      args: {
        id:{type: GraphQLID},
        name: { type: GraphQLString },
        startTS: { type: GraphQLDateTime },
        endTS: { type: GraphQLDateTime },
        poster: { type: GraphQLID },
        type: { type: GraphQLInt },
        host: { type: GraphQLID },
        url: { type: GraphQLString },
        venue: { type: GraphQLString },
      },
      resolve: updateEvent,
    },
  },
});
