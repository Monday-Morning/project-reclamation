const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

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
  addMedia: (
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
      imagekit.getFileDetails(imageKitFileID, (err, _) => {
        if (err) {
          throw APIError('Image not uploaded', null, err);
        } else {
          const media = Media.create(
            imageKitFileID,
            authors,
            store,
            storePath,
            mediaType,
            blurhash,
            session,
            authToken,
            mid
          );
          return media;
        }
      });
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteMediaById: (_parent, { id, imageKitFileID }, { session, authToken, decodedToken, API: { Media } }) => {
    try {
      if (
        !UserPermission.exists(session, authToken, decodedToken, 'media.write.all') ||
        !UserPermission.exists(session, authToken, decodedToken, 'media.write.self')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }
      imagekit.getFileDetails(imageKitFileID, (err, res) => {
        if (err) {
          const _deletedMedia = Media.deleteById(id);
          return _deletedMedia;
        }
        throw APIError('Image not deleted', null, res);
      });
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
