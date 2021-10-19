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

const { APIError } = require('../../utils/exception');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
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

  // TODO: Only display if admin
  getSquiggleByID: async (_parent, { id }, { API: { Squiggle } }, _) => {
    try {
      const _squiggle = await Squiggle.findById(id);

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
      const _squiggles = await Squiggle.find({}, limit, offset);

      return _squiggles;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
