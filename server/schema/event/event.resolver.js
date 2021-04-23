/**
 * @module app.schema.EventResolver
 * @description Event Resolver
 *
 * @requires module:app.schema.EventType
 * @requires module:app.schema.EventModel
 * @requires module:app.authorization
 * @version v1
 * @since 0.1.0
 */

const { GraphQLError, APIError } = require('../../helpers/errorHandler');
const { Model } = require('mongoose');

/**
 * @type {Model}
 */
//const { HasPermission } = require('../../helpers/authorization');
const EventModel = require('./event.model');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
  getEventByID: async (parent, { id }, context, info, _EventModel = EventModel) => {
    try {
      const _event = await _EventModel.findById(id);
      if (!_event) {
        return APIError('NOT_FOUND');
      }
      return _event;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },

  createEvent: async (
    parent,
    { name, startTS, endTS, poster, type, host, url, venue },
    context,
    info,
    _EventModel = EventModel
  ) => {
    try {
      /**
       * Checks if the start time of the event is before the end time of the
       * event and if the event is scheduled after the current time.
       */
      if (new Date(startTS) > new Date(endTS) || new Date(startTS) < Date.now()) {
        return APIError('BAD_REQUEST');
      }
      const _event = await _EventModel.create({
        name,
        startTS,
        endTS,
        poster,
        type,
        host,
        url,
        venue,
      });
      return _event;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },

  updateEvent: async (
    parent,
    { id, name, startTS, endTS, poster, type, host, url, venue },
    context,
    info,
    _EventModel = EventModel
  ) => {
    try {
      if (!_EventModel.exists(id)) {
        return APIError('NOT_FOUND');
      }

      //TODO: Resolver for search events to be written after the approach is finalised.
      /**
       * The getUpdateObject function returns an object that contains the
       * key-value pairs of the event fields that are needed to be updated.
       */
      const getUpdateObject = (propertiesObject) => {
        /**propertiesObject
         * Initialises an empty object that stores the updated fields.
         */
        const updateObject = {};
        /**
         * The propertiesObject(an object which contains the event fields that
         * can be updated) is looped through and only the fields that are
         * required to be updated are added to updateObject.
         */
        for (key in propertiesObject) {
          if (propertiesObject[key]) {
            updateObject[key] = propertiesObject[key];
          }
        }

        return updateObject;
      };

      const updateEvent = getUpdateObject({ name, startTS, endTS, poster, type, host, url, venue });
      const _event = await _EventModel.findByIdAndUpdate(id, updateEvent);
      return _event;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  listEvents: async (parent, { limit = DEF_LIMIT, offset = DEF_OFFSET }, context, info, _EventModel = EventModel) => {
    try {
      /**
       * _allEvents is returned when all the events including the old events are
       * required in the descending order(mainly for admin pannel) while
       * _upcomingEvents is returned when only the upcoming events are
       * required in an ascending order (mainly for the client).
       */
      const _events = await _EventModel.find().skip(offset).limit(limit);
      const _allEvents = await _EventModel.find().skip(offset).limit(limit).sort({ startTS: 'desc' });

      const _upcomingEvents = _events.filter((event) => Date.now() < new Date(event.endTS));

      return _upcomingEvents;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  deleteEvent: async (parent, { id }, context, info, _EventModel = EventModel) => {
    try {
      if (!_EventModel.exists(id)) {
        return APIError('NOT_FOUND');
      }
      const _event = await _EventModel.findByIdAndDelete(id);
      return _event;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  //TODO: Resolver for search events to be written after the approach is finalised.
  searchEvents: async (parent, args, context, info, _EventModel = EventModel) => {},
};
