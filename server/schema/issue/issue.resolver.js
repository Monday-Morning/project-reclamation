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

const { GraphQLError, APIError, FirebaseAuthError } = require('../../helpers/errorHandler');
const { Model } = require('mongoose');
const { HasPermmission } = require('../../helpers/authorization');
/**
 * @type {Model}
 */

const IssueModel = require('./issue.model');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
  getIssueByID: async (parent, { id }, context, info, _IssueModel = IssueModel) => {
    try {
      const _issue = await _IssueModel.findById(id);

      if (!_issue) {
        return APIError('NOT_FOUND');
      }

      if (_issue.publishedAt < Date.now() && !HasPermmission(context, 'issue.read.unpublished')) {
        return APIError('NOT_FOUND');
      }

      return _issue;
    } catch (e) {
      return APIError(null, e);
    }
  },
  listIssues: async (parent, { limit = DEF_LIMIT, offset = DEF_OFFSET }, context, info, _IssueModel = IssueModel) => {
    try {
      const issueQuery = HasPermmission(context, 'issue.list.private') ? {} : { publishedAt: { $lt: Date.now() } };
      const _issues = await _IssueModel.find(issueQuery).skip(offset).limit(limit);

      return _issues;
    } catch (e) {
      return APIError(null, e);
    }
  },
  addIssue: async (parent, { name, description, publishedAt }, context, info, _IssueModel = IssueModel) => {
    try {
      if (!HasPermmission(context, 'issue.write.new')) {
        return APIError('FORBIDDEN');
      }
      const _issue = _IssueModel.create({ name, description, publishedAt: new Date(publishedAt) });

      return _issue;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  updateIssue: async (
    parent,
    { id, name, description, publishedAt, createdBy },
    context,
    info,
    _IssueModel = IssueModel
  ) => {
    try {
      const _issue = await _IssueModel.findById(id);

      if (!_issue) {
        return APIError('NOT_FOUND');
      }

      if (_issue.createdBy && !HasPermmission(context, 'issue.write.self')) {
        return APIError('FORBIDDEN');
      } else if (!HasPermmission(context, 'issue.write.all')) {
        return APIError('FORBIDDEN');
      }

      const getUpdateObject = (propertiesObject) => {
        const updateObject = {};
        for (key in propertiesObject) {
          if (propertiesObject[key]) {
            updateObject[key] = propertiesObject[key];
          }
        }

        return updateObject;
      };
      const updateIssue = getUpdateObject({ name, description, publishedAt: new Date(publishedAt) });

      return _IssueModel.findByIdAndUpdate(id, updateIssue);
    } catch (e) {
      return APIError(null, e);
    }
  },
  deleteIssue: async (parents, { id }, context, info, _IssueModel = IssueModel) => {
    try {
      const _issue = await _IssueModel.findById(id);
      if (!_issue) {
        return APIError('NOT_FOUND');
      }
      if (!HasPermmission(context, 'issue.write.all')) {
        APIError('FORBIDDEN');
      }
      return _IssueModel.findByIdAndDelete(id);
    } catch (e) {
      return APIError(null, e);
    }
  },
};
