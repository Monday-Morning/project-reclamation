const { APIError } = require('../../utils/exception');

module.exports = {
  getMediaByID: async (_parent, { id }, { API: { Media } }, _) => {
    try {
      const _media = await Media.findByID.load(id);

      if (!_media) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested media was not found.' });
      }

      return _media;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
