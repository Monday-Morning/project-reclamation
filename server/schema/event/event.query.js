/**
 * @module app.schema.EventQuery
 * @description Event Query
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
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const EventType = require('./event.type');
const { getEventByID, listEvents, searchEvents } = require('./event.resolver');

module.exports = new GraphQLObjectType({
  name: 'EventQuery',
  fields: {
    getEventByID: {
      description: 'Retrieves a single event',
      type: EventType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "The event's mongo ID.",
        },
      },
      resolve: getEventByID,
    },
    listEvents: {
      type: GraphQLList(EventType),
      description: 'Retrieves a list of all the Events sorted from the lastest to the oldest.',
      resolve: listEvents,
    },
    searchEvents: {
      description: 'Searches a event by keywords',
      type: GraphQLList(EventType),
      args: {
        keywords: {
          description: 'The search keywords',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: searchEvents,
    },
  },
});
