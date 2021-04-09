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
const { admin } = require('../../config/firebase');
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

const canUserUpdate = (id, context, fields) => {
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
    fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !HasPermmission(context, 'user.read.all')
  ) {
    return APIError('FORBIDDEN');
  }

  return true;
};

module.exports = {
  getUser: async (_parent, { id, email }, context, { fieldNodes }, _UserModel = UserModel) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id && !email) {
        return APIError('BAD_REQUEST');
      }

      const _user = !id ? await _UserModel.findOne({ email }) : await _UserModel.findById(id);

      if (!_user) {
        return APIError('NOT_FOUND');
      }

      if (_user.accountType > 1) {
        return _user;
      }

      if (context.mid === _user.id) {
        return _user;
      }

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
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
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
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

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      // TODO: This is a cost operation. Need to rethink.
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
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!keywords) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.list.public') || !HasPermmission(context, 'user.read.public')) {
        return APIError('FORBIDDEN');
      }

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
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
    _auth = admin.auth()
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
        createdBy: CheckSession(context.session, context.authToken) ? context.decodedToken.mid : null,
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
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },

  updateUserName: async (
    _parent,
    { id, firstName, lastName },
    context,
    { fieldNodes },
    _UserModel = UserModel,
    _auth = admin.auth()
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !firstName || !lastName) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _user = await _UserModel.findById(id, 'firstName lastName isNameChanged');

      if (_user.firstName === firstName && _user.lastName === lastName) {
        return APIError('BAD_REQUEST', null, { reason: 'The current and new name matches' });
      }
      if (_user.isNameChanged && !HasPermmission('user.write.all')) {
        return APIError('METHOD_NOT_ALLOWED', null, { reason: 'The user has already changed their name once.' });
      }

      const _fbUser = await _auth.getUserByEmail(_user.email);

      const _updatedUser = _UserModel.findByIdAndUpdate(id, { firstName, lastName });
      const _updatedFbUser = _auth.updateUser(_fbUser.uid, { displayName: `${firstName} ${lastName}` });

      await Promise.all([_updatedUser, _updatedFbUser]);

      return _updatedUser;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },
  updateUserPicture: async (
    _parent,
    { id, url, blurhash },
    context,
    { fieldNodes },
    _UserModel = UserModel,
    _MediaModel = MediaModel,
    _auth = admin.auth(),
    _fetch = fetch
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !url || !blurhash) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      if (!HasPermmission(context, 'media.read.public') || !HasPermmission(context, 'media.write.self')) {
        return APIError('FORBIDDEN');
      }

      const _res = await _fetch(url);
      if (!_res.ok) {
        return APIError('BAD_REQUEST', { reason: 'The provided image resource was not found on the media server.' });
      }

      const _user = await _UserModel.findById(id);
      if (!_user) {
        return APIError('NOT_FOUND');
      }

      const _fbUser = await _auth.getUserByEmail(_user.email);

      const _media = await _MediaModel.create({
        storePath: url,
        blurhash,
        author: [
          {
            name: _user.name,
            reference: id,
          },
        ],
      });
      const _updatedUser = _UserModel.findByIdAndUpdate(id, { picture: _media.id });
      const _updatedFbUser = _auth.updateUser(_fbUser.uid, { displayName: `${firstName} ${lastName}` });

      await Promise.all([_updatedUser, _updatedFbUser]);
      return _updatedUser;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },
  updateUserTopics: async (_parent, { id, interestedTopics }, context, { fieldNodes }, _UserModel = UserModel) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !topics) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _user = await _UserModel.findByIdAndUpdate(id, { interestedTopics });
      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },
  updateUserBio: async (
    _parent,
    { id, bio, facebook, twitter, instagram, linkedin, website, github },
    context,
    { fieldNodes },
    _UserModel = UserModel
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || (!bio && !facebook && !twitter && !instagram && !linkedin && !website && !github)) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _updateData = {
        bio: !bio ? undefined : bio,
        facebook: !facebook ? undefined : facebook,
        twitter: !twitter ? undefined : twitter,
        instagram: !instagram ? undefined : instagram,
        linkedin: !linkedin ? undefined : linkedin,
        website: !website ? undefined : website,
        github: !github ? undefined : github,
      };

      const _user = await _UserModel.findByIdAndUpdate(id, _updateData);
      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },

  addNITRMail: async (
    _parent,
    { id, email },
    context,
    { fieldNodes },
    _UserModel = UserModel,
    _transporter = transporter,
    _namespace = process.env.UUID_NAMESPACE,
    _fromAddress = process.env.SMTP_FROM_ADDRESS
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !email) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _uuid = UUID(JSON.stringify({ id, email }), _namespace).toString();

      // TODO: Configure proper html template
      await _transporter.sendMail({
        to: email,
        from: _fromAddress,
        html: `<a href="https://mondaymorning.nitrkl.ac.in/user/verify/${email}?token=${_uuid}">Click here to verify!</a>`,
      });

      const _user = await _UserModel.findByIdAndUpdate(id, {
        nitrMail: email,
        verifyEmailToken: _uuid,
      });
      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },
  verifyNITRMail: async (
    _parent,
    { id, email, token },
    context,
    { fieldNodes },
    _UserModel = UserModel,
    _auth = admin.auth()
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !email || !token || !validateUUID(token)) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _user = await _UserModel.findOneAndUpdate(
        { $and: [{ id }, { nitrMail: email }, { verfiyEmailToken: token }] },
        { accountType: 1, verfiyEmailToken: null }
      );

      if (!_user) {
        return APIError('NOT_FOUND', null, {
          reason: 'Either the verification token is invalid or the user does not exist.',
        });
      }

      const _fbUser = await _auth.getUserByEmail(_user.email);
      const roles = _fbUser.customClaims.roles.map((item) => {
        if (item.toString() !== 'user.basic') {
          return item;
        }
        return 'user.verified';
      });

      await _auth.setCustomUserClaims(_fbUser.uid, {
        ..._fbUser.customClaims,
        roles,
      });

      return _user;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },

  newsletterSubscription: async (_parent, { id, flag }, context, { fieldNodes }, _UserModel = UserModel) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || flag === null || flag === undefined) {
        return APIError('BAD_REQUEST');
      }

      const _writePermission = canUserUpdate(id, context, fields);
      if (_writePermission !== true) {
        return _writePermission;
      }

      const _user = await _UserModel.findByIdAndUpdate(id, { newsletterSubscription: flag });

      if (!_user) {
        return APIError('NOT_FOUND');
      }

      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },

  /** Admin APIs */
  setUserAccountType: async (_parent, { id, accountType }, context, { fieldNodes }, _UserModel = UserModel) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !accountType) {
        return APIError('BAD_REQUEST');
      }

      // eslint-disable-next-line no-magic-numbers
      if (![0, 1, 2, 3].includes(accountType)) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.write.all')) {
        return APIError('FORBIDDEN');
      }

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      const _user = await _UserModel.findByIdAndUpdate(id, { accountType });

      if (!_user) {
        return APIError('NOT_FOUND');
      }

      return _user;
    } catch (e) {
      return APIError(null, e);
    }
  },
  setUserBan: async (_parent, { id, flag }, context, { fieldNodes }, _UserModel = UserModel, _auth = admin.auth()) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || flag === null || flag === undefined) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.write.all')) {
        return APIError('FORBIDDEN');
      }

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      const _user = await _UserModel.findById(id);
      if (!_user) {
        return APIError('NOT_FOUND');
      }

      const _fbUser = await _auth.getUserByEmail(_user.email);

      const _updatedUser = _UserModel.findByIdAndUpdate(id, { isBanned: flag });
      const _updatedFbUser = _auth.updateUser(_fbUser.uid, { disabled: falg });

      await Promise.all([_updatedUser, _updatedFbUser]);
      return _user;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },
  setUserRoles: async (
    _parent,
    { id, roles },
    context,
    { fieldNodes },
    _UserModel = UserModel,
    _auth = admin.auth()
  ) => {
    const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
    try {
      if (!id || !roles || roles instanceof Array) {
        return APIError('BAD_REQUEST');
      }

      if (!HasPermmission(context, 'user.write.all')) {
        return APIError('FORBIDDEN');
      }

      if (fields.some((item) => !PUBLIC_FIELDS.includes(item)) && !HasPermmission(context, 'user.read.all')) {
        return APIError('FORBIDDEN');
      }

      const _user = await _UserModel.findById(id);
      if (!_user) {
        return APIError('NOT_FOUND');
      }

      const _fbUser = await _auth.getUserByEmail(_user.email);
      await _auth.setCustomUserClaims(_fbUser.uid, {
        ..._fbUser.customClaims,
        roles,
      });

      return _user;
    } catch (e) {
      // eslint-disable-next-line no-magic-numbers
      if (e.code && e.code.toString().substring(0, 4) === 'auth') {
        return FirebaseAuthError(e);
      }
      return APIError(null, e);
    }
  },
};
