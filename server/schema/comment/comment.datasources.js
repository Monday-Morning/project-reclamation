const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const userModel = require('../user/user.model');
const CommentModel = require('./comment.model');

const findByID = () =>
  new DataLoader(
    async (data) => {
      try {
        const _comments = await CommentModel.find({ _id: { $in: data.map(({ id }) => id) } });

        const _returnComments = data.map(({ id, permission, mid }) => {
          const _comment = _comments.find((comment) => comment._id.toString() === id.toString());
          return _comment && _comment.approved ? _comment : permission || mid === _comment.createdBy ? _comment : null;
        });
        return _returnComments;
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findAll = (offset, limit, permission, mid) => {
  // Get approved comments if the user does not have permission to read unapproved comments and the user is not the author
  // Get all comments if the user has permission to read unapproved comments or the user is the author
  const query = permission ? {} : { $or: [{ approved: true }, { approved: false, createdBy: mid }] };
  return CommentModel.find(query).sort({ createdAt: 'desc' }).skip(offset).limit(limit);
};

const countNumberOfComments = (parentID, parentModel) =>
  CommentModel.countDocuments({
    'parent.reference': parentID,
    'parent.model': parentModel,
    approved: true,
  });

const create = async (authorID, content, parentID, parentType, session, authToken, mid, approved) => {
  try {
    const _author = await userModel.findById(authorID);
    if (!_author) {
      throw APIError('NOT FOUND', null, 'Invalid Author ID');
    }

    const [_comment] = await CommentModel.create([
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
        approved: approved || false,
        createdBy: UserSession.valid(session, authToken) ? mid : null,
      },
    ]);

    return _comment;
  } catch (error) {
    throw APIError(null, error);
  }
};

const updateContent = async (id, content, session, authToken, mid) => {
  try {
    const _comment = await CommentModel.findByIdAndUpdate(
      id,
      {
        content,
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );

    return _comment;
  } catch (error) {
    throw APIError(null, error);
  }
};

const approve = (id) => CommentModel.findByIdAndUpdate(id, { approved: true }, { new: true });

const remove = (id) => CommentModel.findByIdAndDelete(id);

const CommentDataSources = () => ({
  findAll,
  findByID: findByID(),
  countNumberOfComments,
  create,
  approve,
  updateContent,
  remove,
});

module.exports = CommentDataSources;
