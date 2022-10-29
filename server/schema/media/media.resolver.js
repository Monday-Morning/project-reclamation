const UserPermission = require('../../utils/userAuth/permission');
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
  addMedia: async (
    _parent,
    { authors, store, storePath, mediaType, blurhash },
    { mid, session, authToken, decodedToken, API: { Media } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'media.write.self')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      const media = Media.create(authors, store, storePath, mediaType, blurhash, session, authToken, mid);
      return media;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteMediaById: async (_parent, { id }, { mid, session, authToken, decodedToken, API: { Media } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'media.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }

      const _deletedMedia = Media.deleteById(id);
      return _deletedMedia;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
