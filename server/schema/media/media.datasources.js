const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const MediaModel = require('./media.model');
const UserSession = require('../../utils/userAuth/session');
const { connection } = require('../../config/mongoose');
const imagekit = require('../../config/imagekit');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _media = await MediaModel.find({ _id: ids });
        return ids.map((id) => _media.find((_u) => _u.id.toString() === id.toString()) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const create = (imageKitFileID, authors, store, storePath, mediaType, blurhash, session, authToken, mid) => {
  try {
    const media = MediaModel.create({
      imageKitFileID,
      authors,
      store,
      storePath,
      mediaType,
      blurhash,
      createdBy: UserSession.valid(session, authToken) ? mid : null,
    });
    return media;
  } catch (error) {
    throw APIError(error, { reason: 'Failed to add media' });
  }
};

const deleteById = async (id, isUser = false) => {
  const mdbSession = await connection.startSession();
  try {
    mdbSession.startTransaction();

    const [_file] = imagekit.listFiles({
      searchQuery: `name = "${id}"`,
    });

    imagekit.deleteFile(_file.fileId);

    const deleteMedia = !isUser ? await MediaModel.findByIdAndDelete(id) : null;

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return isUser ? _file : deleteMedia;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();
    throw APIError(error, { reason: 'Failed to delete media' });
  }
};

const MediaDataSources = () => ({
  findByID: findByID(),
  create,
  deleteById,
});

module.exports = MediaDataSources;
