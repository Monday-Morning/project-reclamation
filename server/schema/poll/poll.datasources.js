const DataLoader = require('dataloader');
const { APIError } = require('../../utils/exception');
const PollModel = require('./poll.model');
const ArticleModel = require('../article/article.model');
const UserSession = require('../../utils/userAuth/session');
const createUpdateObject = require('../../utils/createUpdateObject');

const findByID = new DataLoader(
  async (ids) => {
    try {
      const _polls = await PollModel.find({ _id: ids });
      return ids.map((id) => _polls.find((_u) => _u.id.toString() === id.toString()) || null);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  {
    batchScheduleFn: (cb) => setTimeout(cb, 100),
  }
);

const find = (limit, offset) => PollModel.find().sort({ _id: 'desc' }).skip(offset).limit(limit);
const Create = async (
  question,
  options,
  optionsCount,
  totalVotes,
  expiry,
  article,
  createdBy,
  session,
  authToken,
  mid
) => {
  try {
    const _poll = await PollModel.create({
      question,
      options,
      optionsCount,
      totalVotes,
      expiry,
      article,
      //createdBy: UserSession.valid(session, authToken) ? mid : null,
    });
    return _poll;
  } catch (error) {
    throw APIError(null, error);
  }
};
const updateProps = async (id, updateFields, session, authToken, mid) => {
  await PollModel.findByIdAndUpdate(
    id,
    {
      ...createUpdateObject(updateFields),
      //updatedBy: UserSession.valid(session, authToken) ? mid : null,
    },
    { new: true }
  );
};
const updateArticles = async (id, articles, session, authToken, mid) => {
  try {
    const _articleData = await ArticleModel.find({ _id: articles });

    if (!_articleData || _articleData.length !== articles.length) {
      throw APIError('NOT_FOUND', null, { reason: 'One or more of the articles provided were not found.' });
    }
    return PollModel.findByIdAndUpdate(
      id,
      {
        ...createUpdateObject({ articles }),
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );
  } catch (error) {
    throw APIError(null, error);
  }
};
const remove = (id) => PollModel.findByIdAndDelete(id);
const PollDataSources = () => ({
  findByID,
  find,
  Create,
  updateProps,
  updateArticles,
  remove,
});

module.exports = PollDataSources;
