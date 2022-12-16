const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const ArticleModel = require('./article.model');
const { PublishStatusEnumType } = require('./article.enum.types');
const UserSession = require('../../utils/userAuth/session');
const UserModel = require('../user/user.model');
const { connection } = require('../../config/mongoose');
const createUpdateObject = require('../../utils/createUpdateObject');
const TagModel = require('../tag/tag.model');

const ARTICLE_PUBLISH_TYPES = Object.fromEntries(
  PublishStatusEnumType.getValues().map((item) => [item.name, item.value])
);

const getBaseConditions = (allowRestricted, onlyPublished) => {
  const _baseConditions = [];
  if (!allowRestricted) {
    _baseConditions.push({ isInstituteRestricted: false });
  }
  if (onlyPublished) {
    _baseConditions.push({ publishStatus: ARTICLE_PUBLISH_TYPES.PUBLISHED });
  } else {
    _baseConditions.push({
      publishStatus: {
        $in: Object.values(ARTICLE_PUBLISH_TYPES),
      },
    });
  }
  return _baseConditions;
};

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _articles = await ArticleModel.find({ _id: ids });
        const _returnIds = ids.map((id) => _articles.find((_u) => _u.id.toString() === id.toString()) || null);
        return _returnIds;
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findByOldID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _articles = await ArticleModel.find({ oldArticleId: ids });
        const _returnIds = ids.map(
          (id) => _articles.find((_u) => _u.oldArticleId.toString() === id.toString()) || null
        );
        for (const _article of _articles) {
          findByID().prime(_article._id, _article);
        }
        return _returnIds;
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const find = (query, limit, offset) => ArticleModel.find(query).sort({ createdAt: 'desc' }).limit(limit).skip(offset);

const findByCategories = (allowRestricted, onlyPublished, categoryNumbers, limit, offset) =>
  Promise.all(
    categoryNumbers.map((number) =>
      ArticleModel.find({
        $and: [...getBaseConditions(allowRestricted, onlyPublished), { 'categories.number': number }],
      })
        .sort({ createdAt: 'desc' })
        .skip(offset)
        .limit(limit)
        .exec()
    )
  );

const countOfArticleBySubCategory = (allowRestricted, onlyPublished, categoryNumber) =>
  ArticleModel.countDocuments({
    $and: [...getBaseConditions(allowRestricted, onlyPublished), { 'categories.number': categoryNumber }],
  });

const findByYearAndMonth = (allowRestricted, onlyPublished, limit, offset, startAndEndDate) =>
  ArticleModel.aggregate([
    {
      $match: {
        $and: getBaseConditions(allowRestricted, onlyPublished),
        createdAt: { $gte: startAndEndDate[0], $lt: startAndEndDate[1] },
      },
    },
    {
      $addFields: {
        id: '$_id',
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
  ]);

const countNumberOfArticles = (allowRestricted, onlyPublished) =>
  ArticleModel.countDocuments({
    $and: getBaseConditions(allowRestricted, onlyPublished),
  });

const findAll = (allowRestricted, onlyPublished, limit, offset) =>
  ArticleModel.find({
    $and: getBaseConditions(allowRestricted, onlyPublished),
  })
    .sort({ createdAt: 'desc' })
    .skip(offset)
    .limit(limit);

const search = (keywords, allowRestricted, onlyPublished, limit, offset) =>
  ArticleModel.aggregate([
    {
      $search: {
        index: 'articleSearch',
        text: {
          query: keywords,
          path: ['title', 'inshort', 'tags.name'],
          fuzzy: {
            maxEdits: 1,
          },
        },
      },
    },
    {
      $match: {
        $and: getBaseConditions(allowRestricted, onlyPublished),
      },
    },
    {
      $addFields: {
        id: '$_id',
        searchScore: {
          $meta: 'searchScore',
        },
      },
    },
    {
      $sort: {
        searchScore: -1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
  ]).sort({
    createdAt: 'desc',
  });

const autoComplete = (keyword, allowRestricted, onlyPublished, limit) =>
  ArticleModel.aggregate([
    {
      $search: { index: 'autoComplete', autocomplete: { query: keyword, path: 'title' } },
    },
    {
      $match: {
        $and: getBaseConditions(allowRestricted, onlyPublished),
      },
    },
    {
      $addFields: {
        id: '$_id',
      },
    },
    {
      $limit: limit,
    },
  ]).sort({
    createdAt: 'desc',
  });

const create = async (
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
) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _users = await UserModel.find({ _id: [...authors, ...photographers, ...designers, ...tech] });

    if (_users.some((user) => !user || user.accountType !== 2)) {
      throw APIError('BAD_REQUEST', null, {
        reason:
          'At least one of the user IDs supplied supplied is invalid, i.e. that user does not exist or is not a MM Team Member.',
      });
    }

    // TODO: create google doc and link
    const [_article] = await ArticleModel.create(
      [
        {
          articleType,
          title,
          users: _users.map((_user) => ({
            name: _user.fullName,
            team: authors.includes(_user._id.toString())
              ? 0
              : photographers.includes(_user._id.toString())
              ? 1
              : designers.includes(_user._id.toString())
              ? 2
              : tech.includes(_user._id.toString())
              ? 3
              : APIError(null, null, { reason: 'The data being processed was invalid.' }),
            details: _user._id,
          })),
          categories,
          createdBy: UserSession.valid(session, authToken) ? mid : null,
        },
      ],
      { session: mdbSession }
    );

    // TODO: update user contributions

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _article;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error, { reason: 'The article could not be created.' });
  }
};

const updateProps = (id, updateFields, session, authToken, mid) =>
  ArticleModel.findByIdAndUpdate(
    id,
    {
      ...createUpdateObject(updateFields),
      updatedBy: UserSession.valid(session, authToken) ? mid : null,
    },
    { new: true }
  );

const updateUsers = async (id, authors, photographers, designers, tech, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _uniqueUserIds = [...new Set([...authors, ...photographers, ...designers, ...tech])];

    const _users = await UserModel.find({ _id: _uniqueUserIds });

    if (_users.length !== _uniqueUserIds.length || _users.some((user) => !user || user.accountType !== 2)) {
      throw APIError('BAD_REQUEST', null, {
        reason:
          'At least one of the user IDs supplied supplied is invalid, i.e. that user does not exist or is not a MM Team Member.',
      });
    }

    const _article = await ArticleModel.findByIdAndUpdate(
      id,
      {
        users: [
          ..._users
            .filter((_u) => authors.includes(_u._id.toString()))
            .map((_u) => ({
              name: _u.fullName,
              team: 0,
              details: _u._id,
            })),
          ..._users
            .filter((_u) => photographers.includes(_u._id.toString()))
            .map((_u) => ({
              name: _u.fullName,
              team: 1,
              details: _u._id,
            })),
          ..._users
            .filter((_u) => designers.includes(_u._id.toString()))
            .map((_u) => ({
              name: _u.fullName,
              team: 2,
              details: _u._id,
            })),
          ..._users
            .filter((_u) => tech.includes(_u._id.toString()))
            .map((_u) => ({
              name: _u.fullName,
              team: 3,
              details: _u._id,
            })),
        ],
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { session: mdbSession, new: true }
    );

    // TODO: update user contributions

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _article;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw APIError(null, error, { reason: 'The article could not be updated.' });
  }
};

const updateCategories = async (id, categories, session, authToken, mid) => {
  try {
    const _article = await ArticleModel.findByIdAndUpdate(
      id,
      {
        categories,
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );

    return _article;
  } catch (error) {
    throw APIError(null, error, { reason: 'The article could not be updated.' });
  }
};

const addTag = async (id, tag, isAdmin, session, authToken, mid) => {
  try {
    const [_article, _tag] = await Promise.all([ArticleModel.findById(id), TagModel.findById(tag)]);

    if (!_tag || _tag.isAdmin !== isAdmin) {
      throw APIError('NOT_FOUND', null, { reason: 'The provided tag was not found.' });
    }

    const _updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        tags: [
          ..._article.tags,
          {
            name: _tag.name,
            isAdmin: _tag.isAdmin,
            reference: _tag._id,
          },
        ],
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );

    return _updatedArticle;
  } catch (error) {
    throw APIError(null, error, { reason: 'The article could not be updated.' });
  }
};

const removeTag = async (id, tag, isAdmin, session, authToken, mid) => {
  try {
    const _article = await ArticleModel.findById(id);

    const _updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        tags: _article.tags.filter((_tag) => !(_tag.reference.toString() === tag && _tag.isAdmin === isAdmin)),
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );

    return _updatedArticle;
  } catch (error) {
    throw APIError(null, error, { reason: 'The article could not be updated.' });
  }
};

// TODO: link up with other models
const updateCover = () => null;

// TODO: code google docs API
const updateContent = () => null;

// TODO: if trashed or archived, remove from issues
// TODO: if trashed, also remove from user contributions
const updatePublishStatus = (id, publishStatus, session, authToken, mid) =>
  ArticleModel.findByIdAndUpdate(
    id,
    { publishStatus, updatedBy: UserSession.valid(session, authToken) ? mid : null },
    { new: true }
  );

const incrementEngagementCount = (id, fields) =>
  ArticleModel.findByIdAndUpdate(id, { $inc: fields }, { new: true, timestamps: false });

const ArticleDataSources = () => ({
  findByID: findByID(),
  findByOldID: findByOldID(),
  find,
  findByCategories,
  countOfArticleBySubCategory,
  countNumberOfArticles,
  findByYearAndMonth,
  findAll,
  search,
  autoComplete,
  create,
  updateProps,
  updateUsers,
  updateCategories,
  addTag,
  removeTag,
  updateCover,
  updateContent,
  updatePublishStatus,
  incrementEngagementCount,
});

module.exports = ArticleDataSources;
