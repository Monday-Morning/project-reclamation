/**
 * @module app.schema.SquiggleResolver
 * @description Squiggle Resolver
 *
 * @requires module:app.schema.SquiggleType
 * @requires module:app.schema.SquiggleModel
 * @requires module:app.authorization
 * @version v1
 * @since 0.1.0
 */

const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
  createSquiggle: async (
    _parent,
    { squiggleType, content },
    { session, authToken, decodedToken, API: { Squiggle } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'squiggle.write.new')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to create a squiggle.',
        });
      }
      const _squiggle = await Squiggle.create(squiggleType, content);

      return _squiggle;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  updateSquiggle: async (_parent, { id, newContent }, { session, authToken, decodedToken, API: { Squiggle } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'squiggle.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to update squiggles.',
        });
      }
      let _squiggle = await Squiggle.findByID(id);

      if (!_squiggle) {
        throw APIError('NOT_FOUND', null, { reason: 'The squiggle to update does not exist.' });
      }

      _squiggle = await Squiggle.updateContent(id, newContent);
      return _squiggle;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  getLatestSquiggle: async (_parent, _args, { API: { Squiggle } }, _) => {
    try {
      const _squiggle = await Squiggle.getLatest();

      if (!_squiggle) {
        throw APIError('NOT_FOUND', null, { reason: 'No squiggles were found.' });
      }

      return _squiggle;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  getSquiggleByID: async (_parent, { id }, { API: { Squiggle } }, _) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'squiggle.read.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read select squiggles.',
        });
      }

      const _squiggle = await Squiggle.findByID(id);

      if (!_squiggle) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested squiggle was not found.' });
      }

      return _squiggle;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  listSquiggles: async (_parent, { limit = DEF_LIMIT, offset = DEF_OFFSET }, { API: { Squiggle } }, _) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'squiggle.read.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read select squiggles.',
        });
      }

      const _squiggles = await Squiggle.find({}, limit, offset);

      return _squiggles;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
