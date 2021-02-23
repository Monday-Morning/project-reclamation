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
const UserModel = require('./user.model');

module.exports = {
  getUser: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  listUsers: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  searchUsers: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},

  createUser: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},

  updateUserName: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  updateUserPicture: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  updateUserTopics: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  updateUserBio: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},

  addNITRMail: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
  verifyNITRMail: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},

  newsletterSubscription: async (
    parent,
    args,
    context,
    info,
    _UserModel = UserModel,
    _HasPermission = HasPermmission
  ) => {},

  setUserVerfiedStatus: async (
    parent,
    args,
    context,
    info,
    _UserModel = UserModel,
    _HasPermission = HasPermmission
  ) => {},
  setUserBan: async (parent, args, context, info, _UserModel = UserModel, _HasPermission = HasPermmission) => {},
};
