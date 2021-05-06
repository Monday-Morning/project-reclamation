const TagModel = require('./tag.model');
const { APIError } = require('../../helpers/errorHandler');

module.exports = {
  getTag: async (_parent, { id }, _) => {
    try {
      const _tag = await TagModel.findById(id);
      if (!_tag) {
        return APIError('NOT_FOUND');
      }

      return _tag;
    } catch (error) {
      return APIError(null, error);
    }
  },
};
