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
const TagModel = require('../tag/tag.model');
/**
 * @type {Model}
 */
const ArticleModel = require('./article.model');
/**
 * @type {Model}
 */
const MediaModel = require('../media/media.model');

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

      if ([...authors, ...tech, ...categories].some((item) => !item)) {
        return APIError('BAD_REQUEST', null, {
          reason:
            'At least one of the user IDs supplied (author/tech) or categories supplied is invalid, i.e. that user/category does not exist',
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
  updateArticleProps: async (_parent, { id, title, inshort, categories, tags }, context, _) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      const _users = [..._article.authors, ..._article.tech].map((user) => user.details);

      if (_users.includes(context.mid) && !HasPermmission(context, 'article.write.self')) {
        return APIError('FORBIDDEN');
      } else if (!HasPermmission(context, 'article.write.all')) {
        return APIError('FORBIDDEN');
      }

      categories = !categories ? [] : categories.map((catid) => CategoryMapModel.findById(catid));
      tags = !tags ? [] : tags.map((tagid) => TagModel.findById(tagid));

      await Promise.all([...categories, ...tags]);

      if ([...categories, ...tags].some((item) => !item)) {
        return APIError('BAD_REQUEST', null, {
          reason: 'At least one of the categories or tags supplied is invalid, i.e. it does not exist',
        });
      }

      const _updateObj = {
        title: !title ? undefined : title,
        inshort: !inshort ? undefined : inshort,
        categories:
          categories.length < 1
            ? undefined
            : categories.map((category) => ({
                number: category.number,
                subcategory: category.parent.reference ? true : false,
                reference: category.id,
              })),
        tags:
          tags.length < 1
            ? undefined
            : tags.map((tag) => ({
                name: tag.name,
                admin: tag.isAdmin,
                reference: tag.id,
              })),
      };

      return ArticleModel.findByIdAndUpdate(id, _updateObj);
    } catch (error) {
      return APIError(null, error);
    }
  },
  updateArticleContent: async (_parent, { id, content }, context, _info) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      const _users = [..._article.authors, ..._article.tech].map((user) => user.details);

      if (_users.includes(context.mid) && !HasPermmission(context, 'article.write.self')) {
        return APIError('FORBIDDEN');
      } else if (!HasPermmission(context, 'article.write.all')) {
        return APIError('FORBIDDEN');
      }

      return ArticleModel.findByIdAndUpdate(id, { content });
    } catch (error) {
      return APIError(null, error);
    }
  },
  updateArticleCoverMedia: async (_parent, { id, squareRef, rectangleRef }, context, _) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      const _users = [..._article.authors, ..._article.tech].map((user) => user.details);

      if (_users.includes(context.mid) && !HasPermmission(context, 'article.write.self')) {
        return APIError('FORBIDDEN');
      } else if (!HasPermmission(context, 'article.write.all')) {
        return APIError('FORBIDDEN');
      }

      const [_squareExists, _rectangleExists] = [squareRef, rectangleRef].map((id) => MediaModel.exists({ id }));
      await Promise.all([_squareExists, _rectangleExists]);
      if (!squareExists || !rectangleExists) {
        return APIError('BAD_REQUEST', null, {
          reason: 'The media reference(s) provided was not valid i.e. it does not exist',
        });
      }

      return ArticleModel.findByIdAndUpdate(id, {
        coverMedia: {
          square: squareRef,
          rectangle: rectangleRef,
        },
      });
    } catch (error) {
      return APIError(null, error);
    }
  },
  updateArticleStatus: async (_parent, { id, status }, context, _) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      const _users = [..._article.authors, ..._article.tech].map((user) => user.details);

      if (_users.includes(context.mid) && !HasPermmission(context, 'article.write.self')) {
        return APIError('FORBIDDEN');
      } else if (!HasPermmission(context, 'article.write.all')) {
        return APIError('FORBIDDEN');
      }

      // TODO: if trashed or archived, remove from issue

      return ArticleModel.findByIdAndUpdate(id, { status });
    } catch (error) {
      return APIError(null, error);
    }
  },
};
