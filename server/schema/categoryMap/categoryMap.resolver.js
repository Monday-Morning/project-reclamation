const { APIError } = require('../../utils/exception');

module.exports = {
  getCategory: async (_parent, { id = null, number = null }, { API: { Category: CategoryMap } }) => {
    try {
      const _category = !id ? await CategoryMap.findByNumber.load(number) : await CategoryMap.findByID.load(id);

      if (!_category) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested category does not exist.' });
      }

      return _category;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
