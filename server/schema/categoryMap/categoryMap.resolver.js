const CategoryMapModel = require('./categoryMap.model');
const { APIError } = require('../../helpers/errorHandler');

module.exports = {
  getCategory: async (_parent, { id, number }, _) => {
    try {
      if (!id && (!number || number instanceof Number)) {
        return APIError('BAD_REQUEST');
      }

      const _category = !id ? await CategoryMapModel.findOne({ number }) : await CategoryMapModel.findById(id);
      if (!_category) {
        return APIError('NOT_FOUND');
      }

      return _category;
    } catch (error) {
      return APIError(null, error);
    }
  },
};
