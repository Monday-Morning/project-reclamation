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

const UserPermission = require('../../utils/userAuth/permission');
const UserSession = require('../../utils/userAuth/session');
const { APIError, FirebaseAuthError } = require('../../utils/exception');
const { AccountTypeEnumType } = require('./user.enum.types');
const getFieldNodes = require('../../utils/getFieldNodes');

const PUBLIC_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'fullName',
  'email',
  'accountType',
  'nitrMail',
  'picture',
  'profile',
  'isBanned',
];
const DEF_LIMIT = 10,
  DEF_OFFSET = 0,
  DEF_STORE = 2;
const ACCOUNT_TYPES = Object.fromEntries(AccountTypeEnumType.getValues().map((item) => [item.name, item.value]));

// TODO: add a needsAdmin check for admin APIs
const canReadUser = (user, mid, session, authToken, decodedToken, fieldNodes, noError = false) => {
  if ([ACCOUNT_TYPES.MM_TEAM, ACCOUNT_TYPES.NITR_FACULTY].includes(user.accountType)) {
    return true;
  }

  if (mid === (user.id ?? user._id.toString())) {
    return true;
  }

  if (!UserPermission.exists(session, authToken, decodedToken, 'user.read.private')) {
    if (noError) {
      return false;
    }
    throw APIError('FORBIDDEN', null, {
      reason: "The user does not have the required permissions to read the requested user's data.",
    });
  }

  const _fields = getFieldNodes(fieldNodes);
  if (
    _fields.some((item) => !PUBLIC_FIELDS.includes(item)) &&
    !UserPermission.exists(session, authToken, decodedToken, 'user.read.admin')
  ) {
    if (noError) {
      return false;
    }
    throw APIError('FORBIDDEN', null, {
      reason: 'The user does not have the required permissions to read the requested fields.',
    });
  }

  return true;
};

const canUpdateUser = async (id, mid, session, authToken, decodedToken, fieldNodes, User, needsAdmin = false) => {
  if (!UserSession.valid(session, authToken)) {
    throw APIError('UNAUTHORIZED', null, { reason: 'The user is not authenticated.' });
  }

  const _user = await User.findByID.load(id);

  canReadUser(_user, mid, session, authToken, decodedToken, fieldNodes);

  if (needsAdmin && !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')) {
    throw APIError('FORBIDDEN', null, { reason: 'The user does not have the required administrative priveledges.' });
  }

  if (
    !needsAdmin &&
    mid === id &&
    !UserPermission.exists(session, authToken, decodedToken, 'user.write.self') &&
    !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')
  ) {
    throw APIError('FORBIDDEN', null, { reason: 'The user does not have the permissions to perform this update.' });
  }

  if (!needsAdmin && mid !== id && !UserPermission.exists(session, authToken, decodedToken, 'user.write.all')) {
    throw APIError('FORBIDDEN', null, { reason: 'The user does not have the permissions to perform this update.' });
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
      if (!id && !email) {
        throw APIError('BAD_REQUEST', null, { reason: 'No ID or Email was provided in the arguments.' });
      }

      const _user = !id ? await User.findByEmail.load(email) : await User.findByID.load(id);

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      canReadUser(_user, mid, session, authToken, decodedToken, fieldNodes);

      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  getUserByOldUserName: async (
    _parent,
    { oldUserName },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      const _user = await User.findByOldUserName(oldUserName);

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      canReadUser(_user, mid, session, authToken, decodedToken, fieldNodes);

      return _user;
    } catch (error) {
      throw APIError(null, error);
    }
  },

  getListOfUsers: async (
    _parent,
    { ids = [], emails = [], limit = DEF_LIMIT, offset = DEF_OFFSET },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      if (ids.length <= 0 && emails.length <= 0) {
        throw APIError('BAD_REQUEST', null, { reason: 'No IDs and Emails were provided in the arguments.' });
      }

      const _users = await User.find({ $or: [{ _id: ids }, { email: emails }] }, limit, offset);

      if (!_users || !(_users instanceof Array) || _users.length <= 0) {
        throw APIError('NOT_FOUND', null, { reason: 'No users were found with the provided IDs and Emails.' });
      }

      for (const _user of _users) {
        User.findByID.prime(_user.id, _user);
        User.findByEmail.prime(_user.email, _user);
      }

      return _users.map((user) => {
        try {
          canReadUser(user, mid, session, authToken, decodedToken, fieldNodes);
          return user;
        } catch (error) {
          return error;
        }
      });
    } catch (error) {
      throw APIError(null, error);
    }
  },

  searchUsers: async (
    _parent,
    {
      searchTerm,
      accountType = [ACCOUNT_TYPES.MM_TEAM, ACCOUNT_TYPES.NITR_FACULTY],
      limit = DEF_LIMIT,
      offset = DEF_OFFSET,
    },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      if (
        accountType.some(
          (_accountType) => ![ACCOUNT_TYPES.MM_TEAM, ACCOUNT_TYPES.NITR_FACULTY].includes(_accountType)
        ) &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.admin')
      ) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not the required permission to view the requested account type.',
        });
      }

      const _users = await User.search(searchTerm, accountType, limit, offset);

      if (!_users || !(_users instanceof Array) || _users.length <= 0) {
        throw APIError('NOT_FOUND', null, {
          reason: 'No users were found with the given search term and account type(s).',
        });
      }

      return _users.filter((user) => canReadUser(user, mid, session, authToken, decodedToken, fieldNodes, true));
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
      // TODO: add data validation and cleaning

      const _fbUser = await User.findFirebaseUserByEmail(email);

      if (!UserSession.valid(session, authToken) || _fbUser.uid !== decodedToken.uid) {
        throw APIError('METHOD_NOT_ALLOWED', null, { reason: 'The user does not have the required permissions.' });
      }

      const _user = await User.findByEmail.load(email);

      if (_user && _user.accountType === 2 && _user.oldUserId > 0) {
        if (_fbUser.displayName !== fullName) {
          return APIError('BAD_REQUEST', null, { reason: 'The name provided did not match the existing records.' });
        }

        const _mdbUser = await User.link(_fbUser.uid, _user.id, interestedTopics, session, authToken, mid);

        return _mdbUser;
      }

      if (_user) {
        throw APIError('METHOD_NOT_ALLOWED', null, { reason: 'User already exists' });
      }

      if (_fbUser.displayName !== fullName) {
        return APIError('BAD_REQUEST', null, { reason: 'The name provided did not match the existing records.' });
      }

      const [_mdbUser] = await User.create(_fbUser.uid, fullName, email, interestedTopics, session, authToken, mid);

      return _mdbUser;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },

  // TODO: implement a way to update all redundancies gracefully
  /*
  updateUserName: async (
    _parent,
    { id, firstName, lastName },
    { mid, session, authToken, decodedToken, API: { User } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes);

      const _user = await User.findByID(id);

      if (_user.firstName === firstName && _user.lastName === lastName) {
        return APIError('BAD_REQUEST', null, { reason: 'The current and new name matches' });
      }
      if (_user.isNameChanged && !UserPermission.exists('user.write.all')) {
        return APIError('METHOD_NOT_ALLOWED', null, { reason: 'The user has already changed their name once.' });
      }

      const _fbUser = await User.findFirebaseUserByEmail(_user.email);

      const _updatedUser = await User.updateName(_fbUser.uid, id, firstName, lastName);

      return _updatedUser[0];
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },
  */
  // TODO: implement a way to update all redundancies gracefully
  updateUserProfilePicture: async (
    _parent,
    { id, store = DEF_STORE, storePath, blurhash },
    { mid, session, authToken, decodedToken, API: { User, Media } },
    { fieldNodes }
  ) => {
    try {
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User);

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
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User);

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
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User);

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

  checkNITRMail: async (_parent, { nitrMail }, { mid, session, authToken, decodedToken, API: { User } }, _) => {
    try {
      if (!UserSession.valid(session, authToken)) {
        throw APIError('UNAUTHORIZED', null, { reason: 'The user is not logged in.' });
      }

      const _user = await User.findOne({ nitrMail });

      if (!_user) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      if (!UserPermission.exists(session, authToken, decodedToken, 'user.read.all') && _user._id.toString() !== mid) {
        const _returnUser = PUBLIC_FIELDS.map((field) => [field, _user[field]]);
        return Object.fromEntries(_returnUser);
      }

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

      await canUpdateUser(_user._id.toString(), mid, session, authToken, decodedToken, fieldNodes, User);

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
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User);

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
      // TODO: use canReadUser instead of custom checks
      const _fields = getFieldNodes(fieldNodes);

      if (!UserPermission.exists(session, authToken, decodedToken, 'user.read.admin')) {
        throw APIError('FORBIDDEN', null, {
          reason: 'The user does not have the required permissions to perform this action.',
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
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User, true);

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
      await canUpdateUser(id, mid, session, authToken, decodedToken, fieldNodes, User, true);

      const _user = await User.setBan(id, flag, session, authToken, mid);

      return _user;
    } catch (error) {
      throw FirebaseAuthError(error);
    }
  },
  getFirebaseUserByEmail: async (_parent, { email }, { mid, session, authToken, decodedToken, API: { User } }) => {
    try {
      const firebaseUser = await User.findFirebaseUserByEmail(email);

      if (!firebaseUser) {
        throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
      }

      if (
        mid !== firebaseUser.customClaims.mid &&
        !UserPermission.exists(session, authToken, decodedToken, 'user.read.admin')
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
  // TODO: use id to query the user and then update the custom claims
  // setUserRoles: async (
  //   _parent,
  //   { email, roles },
  //   { mid, session, authToken, decodedToken, API: { User } },
  //   { fieldNodes }
  // ) => {
  //   try {
  //     await canUpdateUser(null, mid, session, authToken, decodedToken, fieldNodes, User, true);
  //     const _user = await User.updateCustomClaims(email, { roles });
  //     return _user;
  //   } catch (error) {
  //     return FirebaseAuthError(error);
  //   }
  // },
};
