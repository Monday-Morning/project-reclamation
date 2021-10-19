const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const IssueModel = require('./issue.model');
const ArticleModel = require('../article/article.model');
const UserSession = require('../../utils/userAuth/session');
const createUpdateObject = require('../../utils/createUpdateObject');

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _issues = await IssueModel.find({ _id: ids });
        return ids.map((id) => _issues.find((_u) => _u.id === id) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const find = (query, limit, offset) => IssueModel.find(query).sort({ _id: 'desc' }).skip(offset).limit(limit);

const create = async (name, description, startDate, endDate, articles, featured, session, authToken, mid) => {
  try {
    if (featured.some((_item) => !articles.includes(_item))) {
      throw APIError('BAD_REQUEST', null, { reason: 'The featured articles must be part of this issue.' });
    }

    const _articleData = await ArticleModel.find({ _id: articles });

    if (!_articleData || _articleData.length !== articles.length) {
      throw APIError('NOT_FOUND', null, { reason: 'One or more of the articles provided were not found.' });
    }

    // TODO: add to session
    return IssueModel.create({
      name,
      description,
      startDate,
      endDate,
      articles,
      featured,
      createdBy: UserSession.valid(session, authToken) ? mid : null,
    });
  } catch (error) {
    throw APIError(null, error);
  }
};

const updateProps = (id, updateFields, session, authToken, mid) =>
  IssueModel.findByIdAndUpdate(
    id,
    {
      ...createUpdateObject(updateFields),
      updatedBy: UserSession.valid(session, authToken) ? mid : null,
    },
    { new: true }
  );

const updateArticles = async (id, articles, featured, session, authToken, mid) => {
  try {
    if (featured.some((_item) => !articles.includes(_item))) {
      throw APIError('BAD_REQUEST', null, { reason: 'The featured articles must be part of this issue.' });
    }

    const _articleData = await ArticleModel.find({ _id: articles });

    if (!_articleData || _articleData.length !== articles.length) {
      throw APIError('NOT_FOUND', null, { reason: 'One or more of the articles provided were not found.' });
    }

    return IssueModel.findByIdAndUpdate(
      id,
      {
        articles,
        featured,
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );
  } catch (error) {
    throw APIError(null, error);
  }
};

const remove = (id) => IssueModel.findByIdAndDelete(id);

const IssueDataSources = () => ({
  findByID: findByID(),
  find,
  create,
  updateProps,
  updateArticles,
  remove,
});

module.exports = IssueDataSources;
