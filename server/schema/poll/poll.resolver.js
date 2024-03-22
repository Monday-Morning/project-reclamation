/**
 * @module app.schema.PollResolver
 * @description  PollResolver
 *
 * @requires module:app.schema.PollType
 * @requires module:app.schema.PollModel
 * @requires module:app.authorization
 * @version v1
 * @since 0.1.0
 */

const { APIError } = require('../../utils/exception');
const getFieldNodes = require('../../utils/getFieldNodes');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

const PUBLIC_FIELDS = ['id', 'question', 'options', 'optionsCount', 'totalVotes', 'expiry', 'articles'];
module.exports = {
  getPollByID: async (_parent, { id }, { session, authToken, decodedToken, API: { Poll } }, { fieldNodes }) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      const _poll = await Poll.findByID.load(id);
      return _poll;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfPolls: async (
    _parent,
    { limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Poll } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields',
        });
      }
      const _polls = await Poll.find(limit, offset);
      return _polls;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  createPoll: (
    _parent,
    { question, options, optionsCount, totalVotes, expiry, article, createdBy },
    { session, authToken, decodedToken, mid, API: { Poll } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields',
        });
      }
      const _poll = Poll.Create(
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
      );
      return _poll;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updatePollProp: (
    _parent,
    { id, question, optionsCount, options, totalVotes, expiry },
    { session, authToken, decodedToken, mid, API: { Poll } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields',
        });
      }
      if (!UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to update this poll.',
        });
      }
      return Poll.updateProps(id, { question, options, optionsCount, totalVotes, expiry }, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updatePollArticles: (
    _parent,
    { id, articles },
    { session, authToken, decodedToken, mid, API: { Poll } },
    fieldNodes
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields',
        });
      }
      if (!UserPermission.exists(session, authToken, decodedToken, 'poll.write.all')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to update this poll.',
        });
      }
      return Poll.updateArticles(id, articles, session, authToken, mid);
    } catch (error) {
      throw APIError(null, error);
    }
  },
  removePoll: (_parent, { id }, { session, authToken, decodedToken, API: { Poll } }) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'poll.write.delete')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to delete this poll.',
        });
      }
      return Poll.remove(id);
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
