const DataLoader = require('dataloader');
const { connection } = require('../../config/mongoose');
const createUpdateObject = require('../../utils/createUpdateObject');
const { APIError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const TagModel = require('./tag.model');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _tags = await TagModel.find({ _id: ids });
        return ids.map((id) => _tags.find((_u) => _u.id === id) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const find = (query, limit, offset) => TagModel.find(query).sort({ _id: 'desc' }).limit(limit).skip(offset);

const autocomplete = (query, isAdmin, limit) =>
  TagModel.aggregate([
    {
      $search: {
        index: 'default',
        autocomplete: {
          query,
          path: 'name',
        },
      },
    },
    {
      $match: {
        isAdmin,
      },
    },
    {
      $addFields: {
        id: '$_id',
      },
    },
    {
      $limit: limit,
    },
  ]);

const create = (name, isAdmin, adminColor, session, authToken, mid) =>
  TagModel.create({ name, isAdmin, adminColor, createdBy: UserSession.valid(session, authToken) ? mid : null });

// TODO: Update all redundancies
const update = async (id, name, isAdmin, adminColor, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _tag = TagModel.findByIdAndUpdate(
      id,
      {
        ...createUpdateObject({ name, isAdmin, adminColor }),
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _tag;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error);
  }
};

const TagDataSources = () => ({
  findByID: findByID(),
  find,
  autocomplete,
  create,
  update,
});

module.exports = TagDataSources;
