const { APIError } = require('../../utils/exception');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

const canMutateComment = async (session, authToken, decodedToken, id, mid, Comment, needsAdmin = false) => {
  const _comment = await Comment.findByID.load(id);

  if (!_comment) {
    throw APIError('NOT FOUND', null, { reason: 'Requested comments were not found' });
  }

  if (
    // If the user is not the author of the comment or does not have permission to delete his/her own comment
    _comment.createdBy !== mid ||
    (!UserPermission.exists(session, authToken, decodedToken, 'comment.write.self') &&
      // Furthermore, if the user is not an admin or does not have permission to delete other's comment
      needsAdmin &&
      !UserPermission.exists(session, authToken, decodedToken, 'comment.write.delete'))
  ) {
    throw APIError('FORBIDDEN', null, 'User does not have required permission to update the comment');
  }
};

const canReadUnApprovedComments = (session, authToken, decodedToken) => {
  try {
    if (!UserPermission.exists(session, authToken, decodedToken, 'comment.read.unapproved')) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getListOfComments: async (
    _parent,
    { ids = null, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, mid, API: { Comment } }
  ) => {
    try {
      const permission = canReadUnApprovedComments(session, authToken, decodedToken);

      const _comments = ids
        ? // Gets approved and unapproved comments of the user if the user does not have permission to read unapproved comments
          // Gets all comments if the user has permission to read unapproved comments
          // Self comments are always returned regardless of permission to be handled by the client
          await Promise.all(
            ids.slice(offset, offset + limit).map((id) => Comment.findByID.load({ id, permission, mid }))
          )
        : await Comment.findAll(offset, limit, permission, mid);

      return _comments.filter((comment) => comment);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getCommentById: async (_parent, { id }, { session, authToken, decodedToken, mid, API: { Comment } }) => {
    try {
      // Gets only approved comments if the user does not have permission to read unapproved comments
      const permission = canReadUnApprovedComments(session, authToken, decodedToken);

      const _comment = await Comment.findByID.load({ id, permission, mid });
      if (!_comment) {
        throw APIError('NOT FOUND', null, { reason: 'Invalid id for comment' });
      }

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  countOfComments: async (_parent, { id, parentType }, { API: { Comment } }) => {
    try {
      const _count = await Comment.countNumberOfComments(id, parentType);
      return _count;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  createComment: async (
    _parent,
    { authorID, content, parentID, parentType },
    { session, authToken, decodedToken, mid, API: { Comment } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'comment.write.new')) {
        throw APIError('FORBIDDEN', null, 'User does not have required permission to create comment');
      }

      // User can write pre-approved comments if they have permission to write approved comments
      const approved = UserPermission.exists(session, authToken, decodedToken, 'comment.write.approve');

      const _comment = await Comment.create(authorID, content, parentID, parentType, session, authToken, mid, approved);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateCommentContent: async (
    _parent,
    { id, content },
    { session, authToken, decodedToken, mid, API: { Comment } }
  ) => {
    try {
      await canMutateComment(session, authToken, decodedToken, id, mid, Comment, false);
      const _comment = await Comment.updateContent(id, content, session, authToken, mid);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  approveComment: async (_parent, { id }, { session, authToken, decodedToken, API: { Comment } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'comment.approve.all')) {
        throw APIError('FORBIDDEN', null, 'User does not have required permission to approve comment');
      }

      const _comment = await Comment.approve(id);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteComment: async (_parent, { id }, { session, authToken, decodedToken, mid, API: { Comment } }) => {
    try {
      await canMutateComment(session, authToken, decodedToken, id, mid, Comment, true);

      const _comment = await Comment.remove(id);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
