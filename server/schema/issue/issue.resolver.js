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

const { APIError } = require('../../helpers/errorHandler');
const { HasPermmission } = require('../../helpers/authorization');

const IssueModel = require('./issue.model');

const DEF_LIMIT = 10;
const DEF_OFFSET = 0;
module.exports = {
  getIssueByID: async (_parent, { id }, context, _info, _IssueModel = IssueModel) => {
    try {
      const _issue = await _IssueModel.findById(id);

      if (!_issue) {
        return APIError('NOT_FOUND');
      }

      if (new Date(_issue.publishedAt) > Date.now() && !HasPermmission(context, 'issue.read.unpublished')) {
        return APIError('NOT_FOUND');
      }

      return _issue;
    } catch (e) {
      return APIError(null, e);
    }
  },
  listIssues: async (_parent, { limit = DEF_LIMIT, offset = DEF_OFFSET }, context, _info, _IssueModel = IssueModel) => {
    try {
      const _issueQuery = HasPermmission(context, 'issue.list.private') ? {} : { publishedAt: { $lt: Date.now() } };
      const _issues = await _IssueModel.find(_issueQuery).skip(offset).limit(limit);

      return _issues;
    } catch (e) {
      return APIError(null, e);
    }
  },
  addIssue: async (_parent, { name, description, publishedAt }, context, _info, _IssueModel = IssueModel) => {
    try {
      if (!HasPermmission(context, 'issue.write.new')) {
        return APIError('FORBIDDEN');
      }
      const _issue = await _IssueModel.create({ name, description, publishedAt: new Date(publishedAt) });

      return _issue;
    } catch (e) {
      return APIError(null, e);
    }
  },
  updateIssue: async (_parent, { id, name, description, publishedAt }, context, _info, _IssueModel = IssueModel) => {
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

      const _propertiesObject = { name, description, publishedAt: new Date(publishedAt) };
      let _updateObject;
      // eslint-disable-next-line prefer-const
      _updateObject = {};
      let _key;
      for (_key in _propertiesObject) {
        if (_propertiesObject[_key]) {
          _updateObject[_key] = _propertiesObject[_key];
        }
      }

      return _IssueModel.findByIdAndUpdate(id, _updateObject);
    } catch (e) {
      return APIError(null, e);
    }
  },
  deleteIssue: async (_parents, { id }, context, _info, _IssueModel = IssueModel) => {
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
