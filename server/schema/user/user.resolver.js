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
// const { v5: UUID } = require('uuid');
// const { transporter } = require('../../config/nodemailer');
const UserPermission = require('../../utils/userAuth/permission');
const UserSession = require('../../utils/userAuth/session');
const { APIError, FirebaseAuthError } = require('../../utils/exception');
const { AccountTypeEnumType } = require('./user.enum.types');
const getFieldNodes = require('../../utils/getFieldNodes');
// const imagekit = require('../../config/imagekit');

const PUBLIC_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'fullName',
  'email',
  'accountType',
  'nitrMail',
  'picture',
  'pictureId',
];
const DEF_LIMIT = 10,
  DEF_OFFSET = 0,
  DEF_STORE = 2;
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
    _fields?.some((item) => !PUBLIC_FIELDS.includes(item)) &&
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

  getUserByOldUserName: async (_parent, { oldUserName }, { API: { User } }) => {
    try {
      const user = await User.getUserByOldUserName.load(oldUserName);

      return user;
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
        !UserSession.valid(session, authToken) ||
        ((await User.findFirebaseUserByEmail(email)).uid !== decodedToken.uid &&
          !UserPermission.exists(session, authToken, decodedToken, 'user.write.all'))
      ) {
        throw APIError('METHOD_NOT_ALLOWED', null, { reason: 'The user does not have the required permissions.' });
      }

      if (await User.exists({ email })) {
        throw APIError('METHOD_NOT_ALLOWED', null, { reason: 'User already exists' });
      }

      // const _fbUser = await _auth.getUserByEmail(email);
      const _fbUser = await User.findFirebaseUserByEmail(email);
      if (_fbUser.displayName !== fullName) {
        return APIError('BAD_REQUEST', null, { reason: 'The name provided did not match the existing records.' });
      }

      const [_mdbUser] = await User.create(_fbUser.uid, fullName, email, interestedTopics, session, authToken, mid);

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
  updateUserProfilePicture: async (
    _parent,
    { id, store = DEF_STORE, storePath, blurhash },
    { mid, session, authToken, decodedToken, API: { User, Media } }
  ) => {
    try {
      canUpdateUser(id, mid, session, authToken, decodedToken);

      const user = await User.findByID.load(id);

      if (!user) {
        throw APIError('NOT_FOUND', null, { reason: 'The user does not exist.' });
      }

      if (user.picture && user.picture.storePath) {
        Media.deleteById(id, true);
      }

      const _user = await User.updateDetails(id, { picture: { store, storePath, blurhash } }, session, authToken, mid);
      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },
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
    { email, nitrMail },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _user = await User.findByEmail.load(email);
      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      const _fbUser = await User.findFirebaseUserByEmail(nitrMail);
      if (!_fbUser) {
        throw APIError('BAD_REQUEST', null, { reason: 'The requested user has not been linked.' });
      }

      canUpdateUser(_user._id.toString(), mid, session, authToken, decodedToken, fieldNodes);

      const _updatedUser = await User.setNITRVerified(
        _user._id,
        RegExp(/^([0-9]{3})([a-zA-Z]{2})([0-9]{4})(\@nitrkl\.ac\.in)$/).test(nitrMail) ? 1 : 3,
        email,
        nitrMail,
        session,
        authToken,
        mid
      );

      return _updatedUser;
    } catch (error) {
      throw APIError(null, error);
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

      const _user = await User.updateDetails(id, { isNewsletterSubscribed: flag }, session, authToken, mid);

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
    { accountType, limit = DEF_LIMIT, offset = DEF_OFFSET },
    { session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _fields = getFieldNodes(fieldNodes);

      if (!UserPermission.exists(session, authToken, decodedToken, 'user.list.all')) {
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

      const _users = await User.find(accountType ? { accountType } : {}, limit, offset);

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
  getFirebaseUserByEmail: async (_parent, { email }, { API: { mid, session, authToken, decodedToken, User } }) => {
    try {
      const firebaseUser = await User.findFirebaseUserByEmail(email);

      if (!firebaseUser) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      if (
        mid !== firebaseUser.customClaims.mid &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.all')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permissions to read the requested data.',
        });
      }

      return firebaseUser;
    } catch (error) {
      return FirebaseAuthError(error);
    }
  },
  setUserRoles: async (
    _parent,
    { email, roles },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      canUpdateUser(null, mid, session, authToken, decodedToken, fieldNodes, true);
      const _user = await User.updateCustomClaims(email, { roles });
      return _user;
    } catch (error) {
      return FirebaseAuthError(error);
    }
  },
};
