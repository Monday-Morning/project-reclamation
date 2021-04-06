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

const fetch = require('node-fetch');
const { v5: UUID, validate: validateUUID } = require('uuid');
const { Model } = require('mongoose');
const { auth } = require('../../config/firebase');
const { transporter } = require('../../config/nodemailer');
const { HasPermmission, CheckSession } = require('../../helpers/authorization');
const { APIError, FirebaseAuthError } = require('../../helpers/errorHandler');

/**
 * @constant
 * @type {Model}
 */
const UserModel = require('./user.model');
/**
 * @constant
 * @type {Model}
 */
const MediaModel = require('../media/media.model');

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
const DEF_LIMIT = 10;
const DEF_OFFSET = 0;

const canUserUpdate = (id, context, fieldNodes) => {
  if (!CheckSession(context.session, context.authToken)) {
    return APIError('UNAUTHORIZED');
  }

  if (
    (context.mid === id && !HasPermmission(context, 'user.write.self') && !HasPermmission('user.write.all')) ||
    (context.mid !== id && !HasPermmission(context, 'user.write.all'))
  ) {
    return APIError('FORBIDDEN');
  }

  if (
    context.mid !== id &&
    fieldNodes.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !HasPermmission(context, 'user.read.all')
  ) {
    return APIError('FORBIDDEN');
  }

  return true;
};

module.exports = {
  getUser: async (_parent, { id, email }, context, { fieldNodes }, _UserModel = UserModel) => {
    try {
      if (!id && !email) {
        return APIError('BAD_REQUEST');
      }

      const _user = !id ? await _UserModel.findOne({ email }) : await _UserModel.findOne({ id });

      if (!_user) {
        return APIError('NOT_FOUND');
      }

      if (_user.accountType > 1) {
        return _user;
      }

      if (context.mid === _user.id) {
        return _user;
      }

      if (fieldNodes.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },
  listUsers: async (
    _parent,
    { ids, emails, limit = DEF_LIMIT, offset = DEF_OFFSET },
    context,
    { fieldNodes },
    _UserModel = UserModel
  ) => {
    try {
      if (
        (!ids || !(ids instanceof Array) || ids.length <= 0) &&
        (!emails || !(emails instanceof Array) || emails.length <= 0)
      ) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.list.all') || !HasPermmission(context, 'user.read.public')) {
        return APIError('FORBIDDEN');
      }

      if (fieldNodes.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      const _users = await _UserModel.find({ id: ids, email: emails }).skip(offset).limit(limit);

      if (!_users || !(_users instanceof Array) || _users.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _users;
    } catch (e) {
      return APIError(null, e);
    }
  },
  searchUsers: async (
    _parent,
    { keywords, accountType, limit = DEF_LIMIT, offset = DEF_OFFSET },
    context,
    { fieldNodes },
    _UserModel = UserModel
  ) => {
    try {
      if (!keywords) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.list.public') || !HasPermmission(context, 'user.read.public')) {
        return APIError('FORBIDDEN');
      }

      if (fieldNodes.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      if (!accountType) {
        let _userGt = 1;
        if (HasPermmission(context, 'user.list.all')) {
          // eslint-disable-next-line no-magic-numbers
          _userGt = -1;
        }
        const _users = await _UserModel
          .find(
            {
              $and: [
                {
                  $text: {
                    $search: keywords,
                    $caseSensitive: false,
                  },
                },
                {
                  accountType: { $gt: _userGt },
                },
              ],
            },
            {
              lean: true,
            }
          )
          .skip(offset)
          .limit(limit);

        if (!_users || _users.length <= 0) {
          return APIError('NOT_FOUND');
        }

        return _users;
      }

      // eslint-disable-next-line no-magic-numbers
      if (![0, 1, 2, 3].includes(accountType)) {
        return APIError('BAD_REQUEST');
      }

      // eslint-disable-next-line no-magic-numbers
      if (accountType < 2 && !HasPermmission(context, 'user.list.all')) {
        return APIError('FORBIDDEN');
      }

      const _users = await _UserModel.find(
        {
          $and: [
            {
              $text: {
                $search: keywords,
                $caseSensitive: false,
              },
            },
            {
              accountType,
            },
          ],
        },
        {
          lean: true,
        }
      );

      if (!_users || _users.length <= 0) {
        return APIError('NOT_FOUND');
      }

      return _users;
    } catch (e) {
      return APIError(null, e);
    }
  },

  createUser: async (
    _parent,
    { fullName, email, interestedTopics },
    context,
    _info,
    _UserModel = UserModel,
    _auth = auth
  ) => {
    try {
      if (CheckSession(context.session, context.authToken) && !HasPermmission(context, 'user.write.all')) {
        return APIError('METHOD_NOT_ALLOWED');
      }

      if (!fullName || !email) {
        return APIError('BAD_REQUEST');
      }
      if (await _UserModel.exists({ email })) {
        return APIError('METHOD_NOT_ALLOWED', null, { reason: 'User already exists' });
      }

      const fbUser = await _auth.getUserByEmail(email);
      if (fbUser.displayName !== fullName) {
        return APIError('BAD_REQUEST', null, { reason: 'The name provided did not match the existing records.' });
      }

      const mdbUser = await _UserModel.create({
        fullName,
        email,
        interestedTopics,
        createdBy: CheckSession(context.session, context.authToken) ? context.decodedToken.customClaims.mid : null,
      });

      await _auth.setCustomUserClaims(fbUser.uid, {
        mid: mdbUser.id,
        // TODO: add all standard roles here
        roles: ['user.basic'],
      });

      // TODO: send welcome mail if required

      return mdbUser;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },

    } catch (e) {
      if (e instanceof GraphQLError) {
        return e;
      }
      return FirebaseAuthError(e);
    }
  },

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
