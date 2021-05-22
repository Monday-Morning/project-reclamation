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

const { APIError } = require('../../helpers/errorHandler');
//const { HasPermmission } = require('../../helpers/authorization');

const SquiggleModel = require('./squiggle.model');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
  getSquiggleByID: async (_parent, { id }, context, _info, _SquiggleModel = SquiggleModel) => {
    try {
      const _squiggle = await _SquiggleModel.findById(id);

      if (!_squiggle) {
        return APIError('NOT_FOUND');
      }
      return _squiggle;
    } catch (e) {
      return APIError(null, e);
    }
  },
  listSquiggles: async (
    _parent,
    { limit = DEF_LIMIT, offset = DEF_OFFSET },
    context,
    _info,
    _IssueModel = IssueModel
  ) => {
    try {
      const _squiggles = await _SquiggleModel.find().skip(offset).limit(limit);

      return _squiggles;
    } catch (e) {
      return APIError(null, e);
    }
  },
};
