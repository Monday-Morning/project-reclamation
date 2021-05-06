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

/**
 * @type {Model}
 */

const IssueModel = require('./issue.model');

module.exports = {
  getIssueByID: async (parent, { id }, context, info, _IssueModel = IssueModel) => {
    try {
      const _issue = await _IssueModel.findById(id);

      if (!_issue) {
        return APIError('NOT_FOUND');
      }
      return _issue;
    } catch (e) {
      return APIError(null, e);
    }
  },
  listIssues: async (parent, args, context, info, _IssueModel = IssueModel) => {},
  addIssue: async (parent, { name, articles, featured }, context, info, _IssueModel = IssueModel) => {
    try {
      const _issue = _IssueModel.create({ name, articles, featured });

      return _issue;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  updateIssue: async (parents, args, context, info, _IssueModel = IssueModel) => {
    try {
    } catch (e) {
      return APIError(null, e);
    }
  },
  deleteIssue: async (parents, { id }, context, info, _IssueModel = IssueModel) => {
    try {
      if (!(await _IssueModel.exists(id))) {
        return APIError('NOT_FOUND');
      }
      const _issue = await _IssueModel.findByIdAndDelete(id);
      return _issue;
    } catch (e) {
      return APIError(null, e);
    }
  },
};
