const { APIError } = require('../../utils/exception');
const UserPermission = require('../../utils/userAuth/permission');

const DEF_LIMIT = 10,
  DEF_OFFSET = 0;

const DEFAULT_TAG_COLOR = 'ffffff';

module.exports = {
  getTagByID: async (_parent, { id }, { session, authToken, decodedToken, API: { Tag } }) => {
    try {
      const _tag = await Tag.findByID.load(id);

      if (!_tag || (_tag.isAdmin && !UserPermission.exists(session, authToken, decodedToken, 'tag.read.admin'))) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested tag does not exist.' });
      }

      return _tag;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfTags: async (
    _parent,
    { ids, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { Tag } }
  ) => {
    try {
      const _query = UserPermission.exists(session, authToken, decodedToken, 'tag.list.admin')
        ? { _id: ids }
        : { $and: [{ _id: ids }, { isAdmin: false }] };

      const _tags = await Tag.find(_query, limit, offset);

      if (!_tags || !(_tags instanceof Array) || _tags.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No tags were found with the provided IDs' });
      }

      for (const _tag of _tags) {
        Tag.findByID.prime(_tag.id, _tag);
      }

      return _tags.length < ids.length
        ? [..._tags, APIError('NOT_FOUND', null, { reason: 'One or more of the requested tags were not found.' })]
        : _tags;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  /** Admin APIs */
  getTagAutocomplete: async (
    _parent,
    { searchTerm, limit = DEF_LIMIT },
    { session, authToken, decodedToken, API: { Tag } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'tag.list.admin')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }

      const _tags = await Tag.autocomplete(searchTerm, true, limit);

      return _tags;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  createTag: async (
    _parent,
    { name, isAdmin = false, adminColor },
    { mid, session, authToken, decodedToken, API: { Tag } }
  ) => {
    try {
      if (
        (!isAdmin && !UserPermission.exists(session, authToken, decodedToken, 'tag.write.public')) ||
        (isAdmin && !UserPermission.exists(session, authToken, decodedToken, 'tag.write.admin'))
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to perform this operation',
        });
      }
      if (isAdmin && !adminColor) {
        adminColor = DEFAULT_TAG_COLOR;
      }

      const _tag = await Tag.create(name, isAdmin, isAdmin ? adminColor : undefined, session, authToken, mid);

      return _tag;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateTag: async (
    _parent,
    { id, name, isAdmin, adminColor },
    { mid, session, authToken, decodedToken, API: { Tag } }
  ) => {
    try {
      if (!UserPermission.exists(session, authToken, decodedToken, 'tag.write.public')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permission to perform this operation.',
        });
      }

      const _tag = await Tag.update(id, name, isAdmin, adminColor, session, authToken, mid);

      return _tag;
    } catch (error) {
      throw APIError(null, error);
    }
  },
};
