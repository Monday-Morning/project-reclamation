const DataLoader = require('dataloader');
const { admin } = require('../../config/firebase');
const { connection } = require('../../config/mongoose');
const createUpdateObject = require('../../utils/createUpdateObject');
const { APIError, FirebaseAuthError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const UserModel = require('./user.model');

const USER_BASE_ROLES = [
  'user.basic',
  'article.basic',
  'reactions.basic',
  'comment.basic',
  'issue.basic',
  'session.basic',
  'squiggle.basic',
  'poll.basic',
  'media.basic',
  'album.basic',
  'tag.basic',
  'category.basic',
  'role.basic',
  'club.basic',
  'event.basic',
  'company.basic',
  'live.basic',
  'shareInternship.basic',
  'forum.basic',
];
const USER_VERIFIED_STUDENT_ROLES = [
  'user.verified',
  'article.student',
  'reactions.basic',
  'comment.verified',
  'issue.basic',
  'session.basic',
  'squiggle.basic',
  'poll.verified',
  'media.basic',
  'album.basic',
  'tag.basic',
  'category.basic',
  'role.basic',
  'club.basic',
  'event.basic',
  'company.verified',
  'live.verified',
  'shareInternship.verified',
  'forum.verified',
];
const USER_VERIFIED_FACULTY_ROLES = [
  'user.verified',
  'article.faculty',
  'reactions.basic',
  'comment.verified',
  'issue.basic',
  'session.basic',
  'squiggle.basic',
  'poll.verified',
  'media.basic',
  'album.basic',
  'tag.basic',
  'category.basic',
  'role.basic',
  'club.basic',
  'event.basic',
  'company.verified',
  'live.verified',
  'shareInternship.verified',
  'forum.verified',
];

const findByID = () =>
  new DataLoader(
    async (ids) => {
      try {
        const _users = await UserModel.find({ _id: ids });
        return ids.map((id) => _users.find((_u) => _u.id.toString() === id.toString()) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findByEmail = () =>
  new DataLoader(
    async (emails) => {
      try {
        const _users = await UserModel.find({ email: emails });
        for (const _user of _users) {
          findByID().prime(_user._id, _user);
        }
        return emails.map((email) => _users.find((_u) => _u.email === email) || null);
      } catch (error) {
        throw APIError(null, error);
      }
    },
    {
      batchScheduleFn: (cb) => setTimeout(cb, 100),
    }
  );

const findByOldUserName = async (oldUserName) => {
  try {
    const _user = await UserModel.findOne({ oldUserName });

    return _user;
  } catch (error) {
    throw APIError(null, error);
  }
};

const findFirebaseUserById = (id) => admin.auth().getUser(id);
const findFirebaseUserByEmail = (email) => admin.auth().getUserByEmail(email);

const findOne = (query) => UserModel.findOne(query);
// TODO: This is a costly operation. Need to rethink.
const find = (query, limit, offset) => UserModel.find(query).sort({ _id: 'desc' }).skip(offset).limit(limit);

const exists = (query) => UserModel.exists(query);

const search = (query, accountType, limit, offset) =>
  UserModel.aggregate([
    {
      $search: {
        // TODO: move const to env
        index: 'default',
        text: {
          query,
          path: ['firstName', 'lastName', 'email', 'nitrMail'],
          fuzzy: {
            maxEdits: 1,
          },
        },
      },
    },
    {
      $match: {
        accountType: {
          $in: accountType,
        },
      },
    },
    {
      $addFields: {
        id: '$_id',
        fullName: {
          $concat: ['$firstName', ' ', '$lastName'],
        },
        searchScore: {
          $meta: 'searchScore',
        },
      },
    },
    {
      $sort: {
        searchScore: -1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
  ]);

const create = async (uid, fullName, email, interestedTopics, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();
    const _user = await UserModel.create(
      [
        {
          fullName,
          email,
          interestedTopics,
          createdBy: UserSession.valid(session, authToken) ? mid : null,
        },
      ],
      { session: mdbSession }
    );

    await admin.auth().setCustomUserClaims(uid, {
      mid: _user[0].id,
      roles: USER_BASE_ROLES,
    });

    await mdbSession.commitTransaction();
    await mdbSession.endSession();
    return _user;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    await admin.auth().deleteUser(uid);
    throw FirebaseAuthError(error, { reason: "The user's account could not be created." });
  }
};

const link = async (uid, id, interestedTopics, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _user = await UserModel.findByIdAndUpdate(
      id,
      interestedTopics
        ? {
            $addToSet: {
              interestedTopics,
            },
            newUserLinked: true,
            updatedBy: UserSession.valid(session, authToken) ? mid : null,
          }
        : {
            newUserLinked: true,
            updatedBy: UserSession.valid(session, authToken) ? mid : null,
          },
      {
        new: true,
        session: mdbSession,
      }
    );

    await admin.auth().setCustomUserClaims(uid, {
      mid: id,
      roles: USER_VERIFIED_STUDENT_ROLES,
    });

    await mdbSession.commitTransaction();
    await mdbSession.endSession();
    return _user;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    await admin.auth().deleteUser(uid);
    throw FirebaseAuthError(error, { reason: "The user's account could not be created." });
  }
};

// TODO: Update all redundancies

// const updateName = (uid, id, firstName, lastName, session, authToken, mid) => {
//   const _updatedUser = UserModel.findByIdAndUpdate(
//     id,
//     {
//       firstName,
//       lastName,
//       isNameChanged: true,
//       updatedBy: UserSession.valid(session, authToken) ? mid : null,
//     },
//     { new: true }
//   );
//   const _updatedFbUser = admin.auth().updateUser(uid, { displayName: `${firstName} ${lastName}` });

//   return Promise.all([_updatedUser, _updatedFbUser]);
// };

const updateDetails = async (id, fields, session, authToken, mid) => {
  try {
    return await UserModel.findByIdAndUpdate(
      id,
      {
        ...createUpdateObject(fields),
        updatedBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { new: true }
    );
  } catch (error) {
    throw FirebaseAuthError(error, { reason: "Cannot update user's details" });
  }
};

const updateCustomClaims = async (email, customClaims) => {
  try {
    const _fbUser = await admin.auth().getUserByEmail(email);
    if (!_fbUser) {
      throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
    }
    await admin.auth().setCustomUserClaims(_fbUser.uid, {
      ..._fbUser.customClaims,
      ...customClaims,
    });
    return {
      ..._fbUser,
      customClaims: {
        ..._fbUser.customClaims,
        ...customClaims,
      },
    };
  } catch (error) {
    throw FirebaseAuthError(error, { reason: "The user's roles could not be updated." });
  }
};

const setNITRVerified = async (id, accountType, email, nitrMail, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _user = await UserModel.findByIdAndUpdate(
      id,
      { accountType, nitrMail, updatedBy: UserSession.valid(session, authToken) ? mid : null },
      { session: mdbSession, new: true }
    );
    if (!_user) {
      throw APIError('NOT_FOUND', null, {
        reason: 'The user does not exist.',
      });
    }

    const _fbUser = await findFirebaseUserByEmail(nitrMail);
    await admin.auth().updateUser(_fbUser.uid, { email });

    const _roles = _fbUser.customClaims.roles.map((item) => {
      const _roleIndex = USER_BASE_ROLES.indexOf(item);
      if (_roleIndex > -1 && (accountType === 1 || accountType === 2)) {
        return USER_VERIFIED_STUDENT_ROLES[_roleIndex];
      }
      if (_roleIndex > -1 && accountType === 3) {
        return USER_VERIFIED_FACULTY_ROLES[_roleIndex];
      }
      return item;
    });

    await admin.auth().setCustomUserClaims(_fbUser.uid, {
      ..._fbUser.customClaims,
      roles: _roles,
    });

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _user;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw FirebaseAuthError(error, { reason: "The user's account could not be verfied." });
  }
};

const setBan = async (id, flag, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _user = await UserModel.findByIdAndUpdate(
      id,
      { isBanned: flag, updatedBy: UserSession.valid(session, authToken) ? mid : null },
      { session: mdbSession, new: true }
    );
    if (!_user) {
      throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
    }

    const _fbUser = await findFirebaseUserByEmail(_user.email);
    await admin.auth().updateUser(_fbUser.uid, { disabled: flag });

    await mdbSession.commitTransaction();
    await mdbSession.endSession();

    return _user;
  } catch (error) {
    await mdbSession.abortTransaction();
    await mdbSession.endSession();

    throw FirebaseAuthError(error, { reason: "The user's ban status could not be updated." });
  }
};

const UserDataSources = () => ({
  findByID: findByID(),
  findByEmail: findByEmail(),
  findByOldUserName,
  findFirebaseUserById,
  findFirebaseUserByEmail,
  findOne,
  find,
  exists,
  search,
  create,
  link,
  // updateName,
  updateDetails,
  updateCustomClaims,
  setNITRVerified,
  setBan,
});

module.exports = UserDataSources;
