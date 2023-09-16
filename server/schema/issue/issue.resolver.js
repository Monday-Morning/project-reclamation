/**
 * @module app.schema.IssueResolver
 * @description Issue Resolver
 *
 * @requires module:app.schema.IssueType
 * @requires module:app.schema.IssueModel
 * @requires module:app.authorization
 * @version v1
 * @since 0.1.0
 */

const { APIError } = require('../../utils/exception');
const getFieldNodes = require('../../utils/getFieldNodes');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

const PUBLIC_FIELDS = ['id', 'name', 'thumbnail', 'description', 'articles', 'featured', '__typename'];

module.exports = {
  getIssueByID: async (_parent, { id }, { session, authToken, decodedToken, API: { Issue } }, { fieldNodes }) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      const _issue = await Issue.findByID.load(id);

      if (!_issue.isPublished && !UserPermission.exists(session, authToken, decodedToken, 'issue.read.unpublished')) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested issue is not found.' });
      }

      return _issue;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getLatestIssues: (
    _parent,
    { onlyPublished = true, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Issue } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      if (!onlyPublished && !UserPermission.exists(session, authToken, decodedToken, 'issue.read.unpublished')) {
        onlyPublished = true;
      }

      return Issue.find(onlyPublished ? { isPublished: true } : {}, limit, offset);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfIssues: async (
    _parent,
    { ids, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Issue } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      const _issues = await Issue.find({ _id: ids }, limit, offset);

      return _issues.map((_issue) =>
        !_issue.isPublished && !UserPermission.exists(session, authToken, decodedToken, 'issue.read.unpublished')
          ? APIError('NOT_FOUND', null, { reason: 'The requested issue is not found.' })
          : _issue
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  createIssue: (
    _parent,
    { name, description, startDate, endDate, articles, featured, isPublished },
    { session, authToken, decodedToken, mid, API: { Issue } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      if (!UserPermission.exists(session, authToken, decodedToken, 'issue.write.new')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to create a new issue.',
        });
      }

      return Issue.create(
        name,
        description,
        startDate,
        endDate,
        articles,
        featured,
        isPublished,
        session,
        authToken,
        mid
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateIssueProps: (
    _parent,
    { id, name, description, startDate, endDate },
    { session, authToken, decodedToken, mid, API: { Issue } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      if (!UserPermission.exists(session, authToken, decodedToken, 'issue.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to update this issue.',
        });
      }

      return Issue.updateProps(id, { name, description, startDate, endDate }, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateIssueArticles: (
    _parent,
    { id, articles, featured },
    { session, authToken, decodedToken, mid, API: { Issue } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'issue.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      if (!UserPermission.exists(session, authToken, decodedToken, 'issue.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to update this issue.',
        });
      }

      return Issue.updateArticles(id, articles, featured, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  removeIssue: (_parent, { id }, { session, authToken, decodedToken, API: { Issue } }, _) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'issue.write.delete')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to delete this issue.',
        });
      }

      return Issue.remove(id);
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
