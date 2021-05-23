const MediaModel = require('./media.model');
const { APIError } = require('../../helpers/errorHandler');

module.exports = {
  getMedia: async (_parent, { id }, _) => {
    try {
      const _media = await MediaModel.findById(id);

      if (!_media) {
        return APIError('NOT_FOUND');
      }

      return _media;
    } catch (error) {
      return APIError(null, error);
    }
  },
};
