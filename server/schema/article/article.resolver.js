const { Model } = require('mongoose');
const { HasPermmission } = require('../../helpers/authorization');
const { APIError } = require('../../helpers/errorHandler');
/**
 * @type {Model}
 */
const ArticleModel = require('./article.model');

module.exports = {
  getArticle: async (_parent, { id }, context, _) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      if ([0, 2, 3].includes(_article.status) && !HasPermmission(context, 'article.read.unpublished')) {
        return APIError('NOT_FOUND');
      }

      if (_article.isInstituteRestricted && !HasPermmission(context, 'article.read.private')) {
        return APIError('FORBIDDEN');
      }

      return _article;
    } catch (error) {
      return APIError(null, error);
    }
  },
  // listArticle
  // searchArticle
};
