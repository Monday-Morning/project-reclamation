const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');

const imagekit = require('../../config/imagekit');

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
    { imageKitFileID, authors, store, storePath, mediaType, blurhash },
    { mid, session, authToken, decodedToken, API: { Media } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'media.write.new')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }

      const _imageData = await imagekit.getFileDetails(imageKitFileID);
      if (!_imageData || (_imageData.statusCode && _imageData.statusCode !== 200)) {
        throw APIError('BAD_REQUEST', null, { reason: 'The media was not uploaded.' });
      }

      const media = await Media.create(authors, store, storePath, mediaType, blurhash, session, authToken, mid);
      return media;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteMediaById: async (_parent, { id }, { session, authToken, decodedToken, API: { Media } }) => {
    try {
      if (
        !UserPermission.exists(session, authToken, decodedToken, 'media.write.all') ||
        !UserPermission.exists(session, authToken, decodedToken, 'media.write.self')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }

      const _media = await Media.findByID.load(id);
      if (!_media) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested media was not found.' });
      }

      const deleteMedia = await Media.deleteById(id, true);
      return deleteMedia;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
