const { APIError } = require('../../utils/exception');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

const canMutateComment = async (session, authToken, decodedToken, id, authorID, mid, Comment) => {
  const _comment = await Comment.findByID.load(id);

  if (!_comment) {
    throw APIError('NOT FOUND', null, { reason: 'Requested comments were not found' });
  }

  if (
    (authorID !== mid || !UserPermission.exists(session, authToken, decodedToken, 'comment.write.new')) &&
    !UserPermission.exists(session, authToken, decodedToken, 'comment.write.all')
  ) {
    throw APIError('FORBIDDEN', null, 'User does not have required permission to update the comment');
  }
};

module.exports = {
  getListOfComments: async (_parent, { ids = null, limit = DEF_LIMIT, offset = DEF_OFFSET }, { API: { Comment } }) => {
    try {
      const _comments = ids
        ? await Promise.all(ids.slice(offset, offset + limit).map((id) => Comment.findByID.loadMany([id, id])))
        : await Comment.findAll(offset, limit);

      if (!_comments || _comments.length === 0) {
        throw APIError('NOT FOUND', null, { reason: 'Requested comments were not found' });
      }
      return _comments;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getCommentById: async (_parent, { id }, { API: { Comment } }) => {
    try {
      const _comment = await Comment.findByID.load(id);
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
      if (
        !UserPermission.exists(session, authToken, decodedToken, 'comment.write.new') &&
        !UserPermission.exists(session, authToken, decodedToken, 'comment.write.all')
      ) {
        throw APIError('FORBIDDEN', null, 'User does not have required permission to create comment');
      }

      //TODO Add support for content.
      const _comment = await Comment.create(authorID, content,parentID, parentType, session, authToken, mid);

      return _comment[0];
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateCommentAuthor: async (
    _parent,
    { id, authorID },
    { session, authToken, decodedToken, mid, API: { Comment } }
  ) => {
    try {
      await canMutateComment(session, authToken, decodedToken, id, authorID, mid, Comment);
      const _comment = await Comment.updateAuthor(id, authorID, session, authToken, mid);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateCommentContent: async (
    _parent,
    { id, content, authorID },
    { session, authToken, decodedToken, mid, API: { Comment } }
  ) => {
    try {
      await canMutateComment(session, authToken, decodedToken, id, authorID, mid, Comment);
      const _comment = await Comment.updateContent(id, content, session, authToken, mid);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  deleteComment: async (_parent, { id, authorID }, { session, authToken, decodedToken, mid, API: { Comment } }) => {
    try {
      await canMutateComment(session, authToken, decodedToken, id, authorID, mid, Comment);

      const _comment = await Comment.remove(id);

      return _comment;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
