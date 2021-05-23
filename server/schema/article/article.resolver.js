const { HasPermmission } = require('../../helpers/authorization');
const { APIError } = require('../../helpers/errorHandler');
const UserModel = require('../user/user.model');
const CategoryMapModel = require('../categoryMap/categoryMap.model');
const TagModel = require('../tag/tag.model');
const ArticleModel = require('./article.model');
const MediaModel = require('../media/media.model');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

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
  getArticlesByIds: async (_parent, { ids }, context, _) => {
    try {
      const _articles = await ArticleModel.find({ _id: ids });

      if (!_articles || _articles.length <= 0) {
        return APIError('NOT_FOUND');
      }

      if (
        _articles.some((item) => [0, 2, 3].includes(item.status)) &&
        !HasPermmission(context, 'article.read.unpublished')
      ) {
        return APIError('NOT_FOUND');
      }

      if (_articles.some((item) => item.isInstituteRestricted) && !HasPermmission(context, 'article.read.private')) {
        return APIError('FORBIDDEN');
      }

      return _articles;
    } catch (error) {
      return APIError(null, error);
    }
  },
  getArticlesByCategories: async (_parent, { categoryNumbers, limit = DEF_LIMIT, offset = DEF_OFFSET }, context, _) => {
    try {
      let _query = {
        $and: [],
      };
      if (!HasPermmission(context, 'article.list.private'))
        _query.$and.push({
          isInstituteRestricted: false,
        });
      if (onlyPublished || !HasPermmission(context, 'article.list.unpublished'))
        _query.$and.push({
          status: 1,
        });

      const _articles = await Promise.all(
        categoryNumbers.map((number) => {
          let _curQuery = _query;
          _curQuery.$and.push({ 'categories.number': number });
          return ArticleModel.find(_curQuery).skip(offset).limit(limit);
        })
      );

      if (!_articles || _articles.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _articles;
    } catch (error) {
      return APIError(null, error);
    }
  },
  listArticles: async (_parent, { onlyPublished, limit = DEF_LIMIT, offset = DEF_OFFSET }, context, _) => {
    try {
      let _query = {
        $and: [],
      };
      if (!HasPermmission(context, 'article.list.private'))
        _query.$and.push({
          isInstituteRestricted: false,
        });
      if (onlyPublished || !HasPermmission(context, 'article.list.unpublished'))
        _query.$and.push({
          status: 1,
        });
      const _articles = await ArticleModel.find(_query).skip(offset).limit(limit);

      if (!_articles || _articles.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _articles;
    } catch (error) {
      return APIError(null, error);
    }
  },
  searchArticle: async (_parent, { keywords, limit = DEF_LIMIT, offset = DEF_OFFSET }, context, _) => {
    try {
      const _query = HasPermmission(context, 'article.list.private')
        ? {
            $text: {
              $search: keywords,
              $caseSensitive: false,
            },
          }
        : {
            $and: [
              {
                $text: {
                  $search: keywords,
                  $caseSensitive: false,
                },
              },
              {
                isInstituteRestricted: false,
              },
            ],
          };
      const _articles = await ArticleModel.find(_query).skip(offset).limit(limit);

      if (!_articles || _articles.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _articles;
    } catch (error) {
      return APIError(null, error);
    }
  },
  createArticle: async (_parent, { articleType, title, authors, tech, categories }, context, _) => {
    try {
      if (!HasPermmission(context, 'article.write.new')) {
        return APIError('FORBIDDEN');
      }

      const _count = authors.length + tech.length + categories.length;

      // TODO: switch to Promise.all (refer getArticlesByCategories)
      authors = await UserModel.find({ _id: authors });
      tech = await UserModel.find({ _id: tech });
      categories = await UserModel.find({ _id: categories });

      if (
        [...authors, ...tech, ...categories].length < _count ||
        [...authors, ...tech, ...categories].some((item) => !item)
      ) {
        return APIError('BAD_REQUEST', null, {
          reason:
            'At least one of the user IDs supplied (author/tech) or categories supplied is invalid, i.e. that user/category does not exist',
        });
      }

      if ([...authors, ...tech].some((user) => user.accountType !== 2)) {
        return APIError('BAD_REQUEST', null, {
          reason: 'At least one of the user IDs supplied (author/tech) is not a MM Team member',
        });
      }

      // TODO: create google doc

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

      const _count = (categories.length || 0) + (tags.length || 0);

      // TODO: switch to Promise.all (refer getArticlesByCategories)
      categories = !categories ? [] : await CategoryMapModel.find({ _id: categories });
      tags = !tags ? [] : await TagModel.find({ _id: tags });

      if ([...categories, ...tags].length < _count || [...categories, ...tags].some((item) => !item)) {
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
  updateArticleContent: async (_parent, { id, content }, context, _) => {
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

      const _exists = await MediaModel.find({ _id: [squareRef, rectangleRef] });
      if (!_exists || _exists.length < 2) {
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
  updateArticleRestriction: async (_parent, { id, flag }, context, _) => {
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

      return ArticleModel.findByIdAndUpdate(id, { isInstituteRestricted: flag });
    } catch (error) {
      return APIError(null, error);
    }
  },
  incrementEngagementCount: async (_parent, { id, engagement }, _) => {
    try {
      const _article = await ArticleModel.findById(id);

      if (!_article) {
        return APIError('NOT_FOUND');
      }

      if ([0, 1, 2].includes(engagement)) {
        // TODO: Sort out after others schemas
        return APIError('METHOD_NOT_ALLOWED');
      }

      const _updateObj = {
        views: engagement === 3 ? _article.views++ : undefined,
        hits: engagement === 4 ? _article.hits++ : undefined,
      };

      return ArticleModel.findByIdAndUpdate(id, _updateObj);
    } catch (error) {
      return APIError(null, error);
    }
  },
};
