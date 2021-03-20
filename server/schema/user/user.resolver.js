/**
 * @module app.schema.UserResolver
 * @description User Resolver
 *
 * @requires module:app.schema.UserType
 * @requires module:app.schema.UserModel
 * @requires module:app.authorization
 *
 * @version v1
 * @since 0.1.0
 */

const { HasPermmission } = require('../../helpers/authorization');
const { APIError, GraphQLError } = require('../../helpers/errorHandler');
const UserModel = require('./user.model');

const PUBLIC_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'picture',
  'pictureId',
  'fullName',
  'nitrMail',
  'accountType',
  'email',
];

module.exports = {
  getUser: async (_parent, { id, email }, context, { fieldNodes }, _UserModel = UserModel) => {
    try {
      if (!id && !email) {
        return APIError('BAD_REQUEST');
      }

      const _user = !id
        ? await _UserModel.findOne({ email }, { lean: true })
        : await _UserModel.findOne({ id }, { lean: true });

      if (!_user) {
        return APIError('NOT_FOUND');
      }

      if (_user.accountType > 0) {
        return _user;
      }

      if (!HasPermmission(context, 'user.read.public')) {
        return APIError('FORBIDDEN');
      }

      if (fieldNodes.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.private')) {
        return APIError('FORBIDDEN');
      }

      return _user;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  listUsers: async (_parent, { ids, emails }, _context, _info, _UserModel = UserModel) => {
    try {
      if (
        (!ids || !(ids instanceof Array) || ids.length <= 0) &&
        (!emails || !(emails instanceof Array) || emails.length <= 0)
      ) {
        return APIError('BAD_REQUEST');
      }

      const _users = _UserModel.findMany({ id: ids, email: emails, accountType: { $gt: 0 } }, { lean: true });

      if (!_users || !(_users instanceof Array) || _users.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _users;
    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return APIError(null, e);
    }
  },
  searchUsers: async (parent, args, context, info, _UserModel = UserModel) => {},

  createUser: async (parent, args, context, info, _UserModel = UserModel) => {},

  updateUserName: async (parent, args, context, info, _UserModel = UserModel) => {},
  updateUserPicture: async (parent, args, context, info, _UserModel = UserModel) => {},
  updateUserTopics: async (parent, args, context, info, _UserModel = UserModel) => {},
  updateUserBio: async (parent, args, context, info, _UserModel = UserModel) => {},

  addNITRMail: async (parent, args, context, info, _UserModel = UserModel) => {},
  verifyNITRMail: async (parent, args, context, info, _UserModel = UserModel) => {},

  newsletterSubscription: async (parent, args, context, info, _UserModel = UserModel) => {},

  setUserVerfiedStatus: async (parent, args, context, info, _UserModel = UserModel) => {},
  setUserBan: async (parent, args, context, info, _UserModel = UserModel) => {},
};
