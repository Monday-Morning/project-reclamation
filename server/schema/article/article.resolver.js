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

const canUpdateArticle = async (id, mid, session, authToken, decodedToken, fieldNodes, Article, needsAdmin = false) => {
  const _fields = getFieldNodes(fieldNodes);

  if (
    _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
  ) {
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not the required permissions to read the requested fields.',
    });
  }

  const _article = await Article.findByID.load(id);

  if (!_article) {
    throw APIError('NOT_FOUND', null, { reason: 'The requested was not found.' });
  }

  const _users = _article.users.map((user) => user.details);

  if (
    (!_users.includes(mid) || needsAdmin) &&
    !UserPermission.exists(session, authToken, decodedToken, 'article.write.all')
  ) {
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have required permission to perform this operation.',
    });
  } else if (
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
      const _fields = getFieldNodes(fieldNodes);

      const _article = await Article.findByID.load(id);

      if (!_article) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      if (
        [ARTICLE_PUBLISH_TYPES.UNPUBLISHED, ARTICLE_PUBLISH_TYPES.ARCHIVED, ARTICLE_PUBLISH_TYPES.TRASHED].includes(
          _article.publishStatus
        ) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished')
      ) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      if (
        _article.isInstituteRestricted &&
        !UserPermission(session, authToken, decodedToken, 'article.read.restricted')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The requested article can only be viewed by students and faculty of NIT Rourkela.',
        });
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

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
      const _fields = getFieldNodes(fieldNodes);

      const _article = await Article.findByOldID.load(id);

      if (!_article) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      if (
        [ARTICLE_PUBLISH_TYPES.UNPUBLISHED, ARTICLE_PUBLISH_TYPES.ARCHIVED, ARTICLE_PUBLISH_TYPES.TRASHED].includes(
          _article.publishStatus
        ) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.unpublished')
      ) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article was not found.' });
      }

      if (
        _article.isInstituteRestricted &&
        !UserPermission(session, authToken, decodedToken, 'article.read.restricted')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The requested article can only be viewed by students and faculty of NIT Rourkela.',
        });
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

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
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      const _articles = await Promise.all(ids.slice(offset, offset + limit).map((id) => Article.findByID.load(id)));

      if (!_articles || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested article(s) were not found.' });
      }

      const _unpublishedPermission = UserPermission.exists(
        session,
        authToken,
        decodedToken,
        'article.read.unpublished'
      );
      const _restritedPermission = UserPermission.exists(session, authToken, decodedToken, 'article.read.restricted');

      // TODO: map the articles to return correct ones with errors instead of rejecting full output
      if (
        _articles.some(
          (_article) =>
            [ARTICLE_PUBLISH_TYPES.UNPUBLISHED, ARTICLE_PUBLISH_TYPES.ARCHIVED, ARTICLE_PUBLISH_TYPES.TRASHED].includes(
              _article.publishStatus
            ) && !_unpublishedPermission
        )
      ) {
        throw APIError('NOT_FOUND', null, { reason: 'One or more of the requested articles cannot be found.' });
      }

      // TODO: map the articles to return correct ones with errors instead of rejecting full output
      if (_articles.some((_article) => _article.isInstituteRestricted && !_restritedPermission)) {
        throw APIError('FORBIDDEN', null, {
          reason: 'One or more of the requested articles can only be viewed by students and faculty of NIT Rourkela.',
        });
      }

      return _articles;
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
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.list.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.list.unpublished');

      const _articles = await Article.findByCategories(allowRestricted, onlyPublished, categoryNumbers, limit, offset);

      if (!_articles || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No categories were requested or no articles were found.' });
      }

      // TODO: check each category for zero articles
      // TODO: do not trust array order completely, try using category number based object

      return _articles;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  countOfArticlesBySubCategory: async (
    _parent,
    { categoryNumber, onlyPublished = true },
    { session, authToken, decodedToken, API: { Article } },
    _info
  ) => {
    try {

      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.list.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.list.unpublished');

      const _articleCount = await Article.countOfArticleBySubCategory(allowRestricted, onlyPublished, categoryNumber);

      return _articleCount;
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
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.list.restricted');
      onlyPublished =
        onlyPublished || !UserPermission.exists(session, authToken, decodedToken, 'article.list.unpublished');

      const _articles = await Article.findAll(allowRestricted, onlyPublished, limit, offset);

      if (!_articles || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found.' });
      }

      return _articles;
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
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      const allowRestricted = UserPermission.exists(session, authToken, decodedToken, 'article.list.restricted');
      const onlyPublished = !UserPermission.exists(session, authToken, decodedToken, 'article.list.unpublished');

      const _articles = await Article.search(keywords, allowRestricted, onlyPublished, limit, offset);

      if (!_articles || _articles.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No articles were found with the given keywords.' });
      }

      return _articles;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  createArticle: async (
    _parent,
    { articleType, title, authors, photographers, designers, tech, categories },
    { session, authToken, decodedToken, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'article.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      if (!UserPermission.exists(session, authToken, decodedToken, 'article.write.new')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to create an article.',
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
    { id, categories },
    { session, authToken, decodedToken, mid, API: { Article } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateArticle(id, mid, session, authToken, decodedToken, fieldNodes, Article);

      // TODO: check if no categories have been changed

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
  updateArticleCover: () => null,
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
  incrementViewCount: (_parent, { id }, { API: { Article } }, _) => {
    try {
      return Article.incrementEngagementCount(id, { views: 1 });
    } catch (error) {
      throw APIError(null, error, { reason: 'The article view count could not be updated.' });
    }
  },
};
