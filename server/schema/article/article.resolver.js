const UserPermission = require('../../utils/userAuth/permission');
const { APIError } = require('../../utils/exception');
const getFieldNodes = require('../../utils/getFieldNodes');
const { PublishStatusEnumType } = require('./article.enum.types');

const PUBLIC_FIELDS = [
  'id',
  'articleType',
  'title',
  'content',
  'inshort',
  'authors',
  'photographers',
  'designers',
  'tech',
  'categoryNumbers',
  'categories',
  'tagNames',
  'tags',
  'coverMedia',
  'reactions',
  'comments',
  'bookmarks',
  'views',
  'hits',
  'readTime',
  'timeSpent',
  'createdAt',
  'updatedAt',
  '__typename',
];
const DEF_LIMIT = 10,
  DEF_OFFSET = 0;
const ARTICLE_PUBLISH_TYPES = Object.fromEntries(
  PublishStatusEnumType.getValues().map((item) => [item.name, item.value])
);

// TODO: add a needsAdmin check for admin APIs
const canReadArticle = (article, session, authToken, decodedToken, fieldNodes, noError = false) => {
  if (
    [ARTICLE_PUBLISH_TYPES.UNPUBLISHED, ARTICLE_PUBLISH_TYPES.ARCHIVED, ARTICLE_PUBLISH_TYPES.TRASHED].includes(
      article.publishStatus
    ) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished')
  ) {
    if (noError) {
      return false;
    }
    throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
  }

  if (
    article.isInstituteRestricted &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted')
  ) {
    if (noError) {
      return false;
    }
    throw APIError('FORBIDDEN', null, {
      reason: 'The requested article can only be viewed by students and faculty of NIT Rourkela.',
    });
  }

  const _fields = getFieldNodes(fieldNodes);
  if (
    _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
  ) {
    if (noError) {
      return false;
    }
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have the required permissions to read the requested fields.',
    });
  }

  return true;
};

const canUpdateArticle = async (id, mid, session, authToken, decodedToken, fieldNodes, Article, needsAdmin = false) => {
  const _article = await Article.findByID.load(id);

  if (!_article) {
    throw APIError('NOT_FOUND', null, { reason: 'The requested was not found.' });
  }

  canReadArticle(_article, session, authToken, decodedToken, fieldNodes);

  const _users = _article.users.map((user) => user.details);

  if (
    (!_users.includes(mid) || needsAdmin) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.write.all')
  ) {
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have required permission to perform this operation.',
    });
  }

  if (
    _users.includes(mid) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.write.self') &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.write.all')
  ) {
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have required permission to perform this operation.',
    });
  }

  return true;
};

module.exports = {
  getArticleByID: async (_parent, { id }, { session, authToken, decodedToken, API: { Article } }, { fieldNodes }) => {
    try {
      const _article = await Article.findByID.load(id);

      if (!_article) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      canReadArticle(_article, session, authToken, decodedToken, fieldNodes);

      return _article;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getArticleByOldID: async (
    _parent,
    { id },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const _article = await Article.findByOldID.load(id);

      if (!_article) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      canReadArticle(_article, session, authToken, decodedToken, fieldNodes);

      return _article;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfArticles: async (
    _parent,
    { ids, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      if (!ids || ids.length <= 0) {
        throw APIError('BAD_REQUEST', null, { reason: 'No IDs were provided in the arguments.' });
      }

      const _articles = await Article.find({ _id: ids }, limit, offset);

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No article(s) were not found.' });
      }

      return _articles.map((_article) => {
        try {
          canReadArticle(_article, session, authToken, decodedToken, fieldNodes);
          return _article;
        } catch (error) {
          return error;
        }
      });
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getArticlesByCategories: async (
    _parent,
    { categoryNumbers, onlyPublished = true, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      if (!categoryNumbers || categoryNumbers.length <= 0) {
        throw APIError('BAD_REQUEST', null, { reason: 'No category numbers were provided in the arguments.' });
      }

      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      const _articles = await Article.findByCategories(allowRestricted, onlyPublished, categoryNumbers, limit, offset);

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found in the requested categories.' });
      }

      // TODO: do not trust array order completely, try using category number based object
      return _articles.map(
        (_articleCategory) =>
          _articleCategory?.filter((_article) =>
            canReadArticle(_article, session, authToken, decodedToken, fieldNodes, true)
          ) ?? APIError('NOT_FOUND', null, { reason: 'No articles were found in one of the requested categories.' })
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  countOfArticlesBySubCategory: async (
    _parent,
    { categoryNumber, onlyPublished = true },
    { session, authToken, decodedToken, API: { Article } },
    _
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      const _articleCount = await Article.countOfArticleBySubCategory(allowRestricted, onlyPublished, categoryNumber);

      return _articleCount;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  listArticlesByYearAndMonth: async (
    _parent,
    { year, month, onlyPublished, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      // TODO: refactor this - bad practice
      function startAndEndDate(year, month) {
        return month ? [new Date(year, month - 1), new Date(year, month)] : [new Date(year, 0), new Date(year + 1, 0)];
      }
      const _articles = await Article.findByYearAndMonth(
        allowRestricted,
        onlyPublished,
        limit,
        offset,
        startAndEndDate(year, month)
      );

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found.' });
      }

      return _articles.filter((_article) =>
        canReadArticle(_article, session, authToken, decodedToken, fieldNodes, true)
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  countTotalNumberOfArticles: async (
    _parent,
    { onlyPublished },
    { session, authToken, decodedToken, API: { Article } }
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      return await Article.countNumberOfArticles(allowRestricted, onlyPublished);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  listAllArticles: async (
    _parent,
    { onlyPublished, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      const _articles = await Article.findAll(allowRestricted, onlyPublished, limit, offset);

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found.' });
      }

      return _articles.filter((_article) =>
        canReadArticle(_article, session, authToken, decodedToken, fieldNodes, true)
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  searchArticle: async (
    _parent,
    { keywords, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      const onlyPublished = !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      const _articles = await Article.search(keywords, allowRestricted, onlyPublished, limit, offset);

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found with the given keywords.' });
      }

      return _articles.filter((_article) =>
        canReadArticle(_article, session, authToken, decodedToken, fieldNodes, true)
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getAutoComplete: async (
    _parent,
    { keywords, limit = DEF_LIMIT },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');
      const onlyPublished = !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished');

      const _articles = await Article.autoComplete(keywords, allowRestricted, onlyPublished, limit);

      if (!_articles || !(_articles instanceof Array) || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found with the given keywords.' });
      }

      return _articles.filter((_article) =>
        canReadArticle(_article, session, authToken, decodedToken, fieldNodes, true)
      );
    } catch (error) {
      throw APIError(null, error);
    }
  },

  createArticle: async (
    _parent,
    { articleType, title, authors, photographers, designers, tech, categoryNumbers },
    { mid, session, authToken, decodedToken, API: { Article, CategoryMap } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'article.write.new')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to create an article.',
        });
      }

      const _categories = await CategoryMap.findByNumber.loadMany(categoryNumbers);

      const categories = _categories?.reduce((acc, curr) => {
        acc.push({ reference: curr._id, number: curr.number, subcategory: curr.number > 10 ? true : false });
        return acc;
      }, []);

      if (!categories || categories.length <= 0 || categories.length !== categoryNumbers.length) {
        throw APIError('NOT_FOUND', null, {
          reason: 'At least one of the category IDs supplied supplied is invalid, i.e. that category does not exist.',
        });
      }

      const _article = await Article.create(
        articleType,
        title,
        authors,
        photographers,
        designers,
        tech,
        categories,
        session,
        authToken,
        mid
      );

      return _article;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticleProps: async (
    _parent,
    { id, title, inshort },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article);

      return Article.updateProps(id, { title, inshort }, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticleUsers: async (
    _parent,
    { id, authors, photographers, designers, tech },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article);

      // TODO: check if no users have been changed

      return Article.updateUsers(id, authors, photographers, designers, tech, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticleCategories: async (
    _parent,
    { id, categoryNumbers },
    { session, authToken, decodedToken, mid, API: { Article, CategoryMap } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article);

      // TODO: check if no categories have been changed

      const _categories = await CategoryMap.findByNumber.loadMany(categoryNumbers);

      const categories = _categories.reduce((acc, curr) => {
        acc.push({ reference: curr._id, number: curr.number, subcategory: curr.number > 10 ? true : false });
        return acc;
      }, []);

      if (!categories || categories.length <= 0 || categories.length !== categoryNumbers.length) {
        throw APIError('NOT_FOUND', null, {
          reason: 'At least one of the category IDs supplied supplied is invalid, i.e. that category does not exist.',
        });
      }

      return Article.updateCategories(id, categories, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticleTags: async (
    _parent,
    { id, tag, isAdded, isAdmin },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article, isAdmin);

      return isAdded
        ? Article.addTag(id, tag, isAdmin, session, authToken, mid)
        : Article.removeTag(id, tag, isAdmin, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  // TODO: link with media models
  updateArticleCover: async (
    _parent,
    { id, squareRef, rectangleRef },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article, true);

      return Article.updateCover(id, squareRef, rectangleRef, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  // TODO: get google docs API setup
  updateArticleContent: () => null,
  updateArticleApprovalStatus: async (
    _parent,
    { id, approvalStatus },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article, true);

      return Article.updateProps(id, { approvalStatus }, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticlePublishStatus: async (
    _parent,
    { id, publishStatus },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article, true);

      return Article.updatePublishStatus(id, publishStatus, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateArticleRestriction: async (
    _parent,
    { id, isInstituteRestricted },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article, true);

      return Article.updateProps(id, { isInstituteRestricted }, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  // TODO: only allow server side calls or after app check validation
  incrementViewCount: (_parent, { id }, { API: { Article } }, _) => {
    try {
      return Article.incrementEngagementCount(id, { views: 1 });
    } catch (error) {
      throw APIError(null, error, { reason: 'The article view count could not be updated.' });
    }
  },
};
