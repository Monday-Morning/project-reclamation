const DataLoader = require('dataloader');
const { connection } = require('../../config/mongoose');
const { APIError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const userModel = require('../user/user.model');
const CommentModel = require('./comment.model');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _comments = await CommentModel.find({ _id: ids });

        const _returnComments = ids.map((id) => _comments.find((_comment) => _comment.id.toString() === id.toString()));
        return _returnComments;
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findAll = (offset, limit) => CommentModel.find().sort({ createdAt: 'desc' }).skip(offset).limit(limit);

const countNumberOfComments = (parentID, parentModel) =>
  CommentModel.countDocuments({
    'parent.reference': parentID,
    'parent.model': parentModel,
  });

const create = async (authorID, content, parentID, parentType, session, authToken, mid) => {
  const mdbSession = await connection.startSession();
  try {
    mdbSession.startTransaction();
    const _author = await userModel.findById(authorID);

    const _comment = await CommentModel.create(
      [
        {
          content,
          author: {
            name: _author.fullName,
            reference: authorID,
          },
          parent: {
            reference: parentID,
            model: parentType,
          },
          createdBy: UserSession.valid(session, authToken) ? mid : null,
        },
      ],
      { session: mdbSession }
    );
    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _comment;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error);
  }
};

const updateContent = async (id, content, session, authToken, mid) => {
  const mdbSession = await connection.startSession();
  try {
    mdbSession.startTransaction();

    const _comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        content,
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true, session: mdbSession }
    );
    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _comment;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error);
  }
};

const updateAuthor = async (id, authorID, session, authToken, mid) => {
  const mdbSession = await connection.startSession();
  try {
    mdbSession.startTransaction();

    const _author = await userModel.findById(authorID);
    const _comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        author: {
          name: _author.fullName,
          reference: authorID,
        },
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true, session: mdbSession }
    );
    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _comment;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error);
  }
};

const remove = async (id) => {
  const mdbSession = await connection.startSession();
  try {
    mdbSession.startTransaction();

    const _comment = await CommentModel.findByIdAndDelete(id);
    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _comment;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error);
  }
};

const CommentDataSources = () => ({
  findAll,
  findByID: findByID(),
  countNumberOfComments,
  create,
  updateContent,
  updateAuthor,
  remove,
});

module.exports = CommentDataSources;
