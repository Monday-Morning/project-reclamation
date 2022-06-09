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

// const fetch = require('node-fetch');
const { v5: UUID } = require('uuid');
const { transporter } = require('../../config/nodemailer');
const UserPermission = require('../../utils/userAuth/permission');
const UserSession = require('../../utils/userAuth/session');
const { APIError, FirebaseAuthError } = require('../../utils/exception');
const { AccountTypeEnumType } = require('./user.enum.types');
const getFieldNodes = require('../../utils/getFieldNodes');

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
  'contributions',
];
const DEF_LIMIT = 10,
  DEF_OFFSET = 0;
const ACCOUNT_TYPES = Object.fromEntries(AccountTypeEnumType.getValues().map((item) => [item.name, item.value]));

const canUpdateUser = (id, mid, session, authToken, decodedToken, fieldNodes, needsAdmin = false) => {
  const _fields = getFieldNodes(fieldNodes);
  if (!UserSession.valid(session, authToken)) {
    throw APIError('UNAUTHORIZED', null, { reason: 'The user is not authenticated.' });
  }

  if (needsAdmin && !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')) {
    throw APIError('FORBIDDEN', null, { reason: 'The user does not have the required administrative priveledges.' });
  } else if (
    (mid === id &&
      !UserPermission.exists(session, authToken, decodedToken, 'user.write.self') &&
      !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')) ||
    (mid !== id && !UserPermission.exists(session, authToken, decodedToken, 'user.write.all'))
  ) {
    throw APIError('FORBIDDEN', null, { reason: 'The user does not have the permissions to perform this update.' });
  }

  if (
    mid !== id &&
    _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
  ) {
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have the permissions to read the equested fields.',
    });
  }

  return true;
};

module.exports = {
  getUser: async (
    _parent,
    { id = null, email = null },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      const _user = !id ? await User.findByEmail.load(email) : await User.findByID.load(id);

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      if ([ACCOUNT_TYPES.MM_TEAM, ACCOUNT_TYPES.NITR_FACULTY].includes(_user.accountType)) {
        return _user;
      }

      if (mid === _user.id) {
        return _user;
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to read the requested fields.',
        });
      }

      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  getListOfUsers: async (
    _parent,
    { ids = [], emails = [], limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);
      if (ids.length <= 0 && emails.length <= 0) {
        throw APIError('BAD_REQUEST', null, { reason: 'No IDs and Emails were provided in the arguments.' });
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      // TODO: Use findByID and findByEmail
      const _users = await User.find({ $or: [{ _id: ids }, { email: emails }] }, limit, offset);

      if (!_users || !(_users instanceof Array) || _users.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No users were found with the provided IDs and Emails.' });
      }

      for (const _user of _users) {
        User.findByID.prime(_user.id, _user);
        User.findByEmail.prime(_user.email, _user);
      }

      // TODO: check user account type for all values and return error acordingly

      return _users.length < ids.length + emails.length
        ? [..._users, APIError('NOT_FOUND', null, { reason: 'One or more of the requested users were not found.' })]
        : _users;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  // TODO: use aggregation pipelines
  searchUsers: async (
    _parent,
    { searchTerm, accountType, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      if (!UserPermission.exists(session, authToken, decodedToken, 'user.list.public')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to perform this action.',
        });
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to view the requested fields',
        });
      }

      if (!accountType) {
        accountType = [ACCOUNT_TYPES.MM_TEAM, ACCOUNT_TYPES.NITR_FACULTY];
        if (UserPermission.exists(session, authToken, decodedToken, 'user.list.all')) {
          accountType = [
            ACCOUNT_TYPES.NORMAL,
            ACCOUNT_TYPES.NITR_STUDENT,
            ACCOUNT_TYPES.MM_TEAM,
            ACCOUNT_TYPES.NITR_FACULTY,
          ];
        }
      } else {
        if (
          [ACCOUNT_TYPES.NORMAL, ACCOUNT_TYPES.NITR_STUDENT].includes(accountType) &&
          !UserPermission.exists(session, authToken, decodedToken, 'user.list.all')
        ) {
          throw APIError('FORBIDDEN', null, {
            reason: 'The user does not the required permission to view the requested account type.',
          });
        }
        accountType = [accountType];
      }

      const _users = await User.search(searchTerm, accountType, limit, offset);

      if (!_users || _users.length <= 0) {
        throw APIError('NOT_FOUND', null, {
          reason: 'No users were found with the given search term and account type(s).',
        });
      }

      return _users;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  createUser: async (
    _parent,
    { fullName, email, interestedTopics },
    { mid, session, authToken, decodedToken, API: { User } }
  ) => {
    try {
      if (
        UserSession.valid(session, authToken) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')
      ) {
        throw APIError('METHOD_NOT_ALLOWED');
      }

      if (await User.exists({ email })) {
        throw APIError('METHOD_NOT_ALLOWED', null, { reason: 'User already exists' });
      }

      // const _fbUser = await _auth.getUserByEmail(email);
      const _fbUser = await User.findFirebaseUserByEmail(email);
      if (_fbUser.displayName !== fullName) {
        return APIError('BAD_REQUEST', null, { reason: 'The name provided did not match the existing records.' });
      }

      const _mdbUser = await User.create(_fbUser.uid, fullName, email, interestedTopics, session, authToken, mid);

      // TODO: send welcome mail if required

      return _mdbUser;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },

  updateUserName: async (
    _parent,
    { id, firstName, lastName },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      // const _user = await _UserModel.findByID(id, 'firstName lastName isNameChanged');
      const _user = await User.findByID(id);

      if (_user.firstName === firstName && _user.lastName === lastName) {
        return APIError('BAD_REQUEST', null, { reason: 'The current and new name matches' });
      }
      if (_user.isNameChanged && !UserPermission.exists('user.write.all')) {
        return APIError('METHOD_NOT_ALLOWED', null, { reason: 'The user has already changed their name once.' });
      }

      // const _fbUser = await _auth.getUserByEmail(_user.email);
      const _fbUser = await User.findFirebaseUserByEmail(_user.email);

      const _updatedUser = await User.updateName(_fbUser.uid, id, firstName, lastName);

      return _updatedUser[0];
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },
  // TODO: rewrite function with data sources
  // TODO: update all redundancies
  // TODO: delete older picture
  // updateUserPicture: async (
  //   _parent,
  //   { id, url, blurhash },
  //   context,
  //   { fieldNodes },
  //   _UserModel = UserModel,
  //   _MediaModel = MediaModel,
  //   _auth = admin.auth(),
  //   _fetch = fetch
  // ) => {
  //   const fields = fieldNodes[0].selectionSet.selections.map((x) => x.name.value);
  //   try {
  //     if (!id || !url || !blurhash) {
  //       return APIError('BAD_REQUEST');
  //     }
  //     const _writePermission = canUserUpdate(id, context, fields);
  //     if (_writePermission !== true) {
  //       return _writePermission;
  //     }
  //     if (!HasPermmission(context, 'media.read.public') || !HasPermmission(context, 'media.write.self')) {
  //       return APIError('FORBIDDEN');
  //     }
  //     const _res = await _fetch(url);
  //     if (!_res.ok) {
  //       return APIError('BAD_REQUEST', { reason: 'The provided image resource was not found on the media server.' });
  //     }
  //     const _user = await _UserModel.findByID(id);
  //     if (!_user) {
  //       return APIError('NOT_FOUND');
  //     }
  //     const _fbUser = await _auth.getUserByEmail(_user.email);
  //     const _media = await _MediaModel.create({
  //       storePath: url,
  //       blurhash,
  //       author: [
  //         {
  //           name: _user.name,
  //           reference: id,
  //         },
  //       ],
  //     });
  //     const _updatedUser = _UserModel.findByIdAndUpdate(id, { picture: _media.id });
  //     const _updatedFbUser = _auth.updateUser(_fbUser.uid, { displayName: `${firstName} ${lastName}` });
  //     await Promise.all([_updatedUser, _updatedFbUser]);
  //     return _updatedUser;
  //   } catch (error) {
  //     return FirebaseAuthError(error);
  //   }
  // },
  updateUserTopics: async (
    _parent,
    { id, interestedTopics },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _user = await User.updateDetails(id, { interestedTopics }, session, authToken, mid);
      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  updateUserBio: async (
    _parent,
    { id, bio, facebook, twitter, instagram, linkedin, website, github },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _user = await User.updateDetails(
        id,
        { bio, facebook, twitter, instagram, linkedin, website, github },
        session,
        authToken,
        mid
      );
      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  addNITRMail: async (
    _parent,
    { id, email },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes },
    _transporter = transporter,
    _namespace = process.env.UUID_NAMESPACE,
    _fromAddress = process.env.SMTP_FROM_ADDRESS
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _uuid = UUID(JSON.stringify({ id, email, authToken }), _namespace).toString();

      // TODO: Configure proper html template
      await _transporter.sendMail({
        to: email,
        from: _fromAddress,
        html: `<a href="https://mondaymorning.nitrkl.ac.in/user/verify/${email}?token=${_uuid}">Click here to verify!</a>`,
      });

      const _user = await User.updateDetails(
        id,
        {
          nitrMail: email,
          verifyEmailToken: _uuid,
        },
        session,
        authToken,
        mid
      );
      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  verifyNITRMail: async (
    _parent,
    { id, email, token },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _updatedUser = await User.setVerified(
        id,
        email,
        token,
        ACCOUNT_TYPES.NITR_STUDENT,
        session,
        authToken,
        mid
      );

      return _updatedUser;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },

  newsletterSubscription: async (
    _parent,
    { id, flag },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _user = await User.updateDetails(id, { newsletterSubscription: flag }, session, authToken, mid);

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  /** Admin APIs */
  listAllUsers: async (
    _parent,
    { limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      if (
        !UserPermission.exists(session, authToken, decodedToken, 'user.list.all') ||
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.public')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to perform this action.',
        });
      }

      if (
        _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested fields.',
        });
      }

      const _users = await User.find({}, limit, offset);

      for (const _user of _users) {
        User.findByID.prime(_user.id, _user);
        User.findByEmail.prime(_user.email, _user);
      }

      return _users;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  setUserAccountType: async (
    _parent,
    { id, accountType },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, true);

      const _user = await User.updateDetails(id, { accountType }, session, authToken, mid);

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },
  setUserBan: async (
    _parent,
    { id, flag },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, true);

      const _user = await User.setBan(id, flag, session, authToken, mid);

      return _user;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },
  setUserRoles: async (
    _parent,
    { id, roles },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, true);

      const _user = await User.updateRoles(id, roles);

      return _user;
    } catch (error) {
      return FirebaseAuthError(error);
    }
  },
};
