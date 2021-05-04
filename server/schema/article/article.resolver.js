const { Model } = require('mongoose');
const { HasPermmission } = require('../../helpers/authorization');
const { APIError } = require('../../helpers/errorHandler');
/**
 * @type {Model}
 */
const UserModel = require('../user/user.model');
/**
 * @type {Model}
 */
const CategoryMapModel = require('../categoryMap/categoryMap.model');
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

      // eslint-disable-next-line no-magic-numbers
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
  createArticle: async (_parent, { articleType, title, authors, tech, categories }, context, _) => {
    try {
      if (!HasPermmission(context, 'article.write.new')) {
        return APIError('FORBIDDEN');
      }

      authors = authors.map((userid) => UserModel.findById(userid));
      tech = tech.map((userid) => UserModel.findById(userid));
      categories = categories.map((catid) => CategoryMapModel.findById(catid));

      await Promise.all([...authors, ...tech, ...categories]);

      if ([...authors, ...tech, ...categories].some((user) => !user)) {
        return APIError('BAD_REQUEST', null, {
          reason: 'At least one of the user IDs supplied (author/tech) is invalid, i.e. that user does not exist',
        });
      }

      // eslint-disable-next-line no-magic-numbers
      if ([...authors, ...tech].some((user) => user.accountType !== 2)) {
        return APIError('BAD_REQUEST', null, {
          reason: 'At least one of the user IDs supplied (author/tech) is not a MM Team member',
        });
      }

      const _article = await ArticleModel.create({
        articleType,
        title,
        authors: authors.map((user) => ({ name: user.fullName, details: user.id })),
        tech: tech.map((user) => ({ name: user.fullName, details: user.id })),
        categories: categories.map((category) => ({
          number: category.number,
          subcategory: category.parent.reference ? true : false,
          reference: category.id,
        })),
      });

      return _article;
    } catch (error) {
      return APIError(null, error);
    }
  },
};
