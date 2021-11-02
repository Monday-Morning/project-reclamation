const DataLoader = require('dataloader');
const { admin } = require('../../config/firebase');
const { connection } = require('../../config/mongoose');
const createUpdateObject = require('../../utils/createUpdateObject');
const { APIError, FirebaseAuthError } = require('../../utils/exception');
const UserSession = require('../../utils/userAuth/session');
const UserModel = require('./user.model');

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
        // TODO: rectify index name
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
      {
        fullName,
        email,
        interestedTopics,
        createdBy: UserSession.valid(session, authToken) ? mid : null,
      },
      { session: mdbSession }
    );

    await admin.auth().setCustomUserClaims(uid, {
      mid: _user.id,
      // TODO: add all standard roles here
      roles: ['user.basic'],
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
const updateName = (uid, id, firstName, lastName, session, authToken, mid) => {
  const _updatedUser = UserModel.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      isNameChanged: true,
      updatedBy: UserSession.valid(session, authToken) ? mid : null,
    },
    { new: true }
  );
  const _updatedFbUser = admin.auth().updateUser(uid, { displayName: `${firstName} ${lastName}` });

  return Promise.all([_updatedUser, _updatedFbUser]);
};

const updateDetails = (id, fields, session, authToken, mid) =>
  UserModel.findOneAndUpdate(
    id,
    {
      ...createUpdateObject(fields),
      updatedBy: UserSession.valid(session, authToken) ? mid : null,
    },
    { new: true }
  );

const updateRoles = async (id, roles) => {
  try {
    const _user = await UserModel.findById(id, 'email');
    if (!_user) {
      throw APIError('NOT_FOUND', null, { reason: 'The requested user does not exist.' });
    }

    const _fbUser = await _auth.getUserByEmail(_user.email);
    await _auth.setCustomUserClaims(_fbUser.uid, {
      ..._fbUser.customClaims,
      roles,
    });

    return _user;
  } catch (error) {
    throw FirebaseAuthError(error, { reason: "The user's roles could not be updated." });
  }
};

const setVerified = async (id, email, token, accountType, session, authToken, mid) => {
  const mdbSession = await connection.startSession();

  try {
    mdbSession.startTransaction();

    const _user = await UserModel.findOneAndUpdate(
      { $and: [{ _id: id }, { nitrMail: email }, { verfiyEmailToken: token }] },
      { accountType, verfiyEmailToken: null, updatedBy: UserSession.valid(session, authToken) ? mid : null },
      { session: mdbSession, new: true }
    );
    if (!_user) {
      throw APIError('NOT_FOUND', null, {
        reason: 'Either the verification token is invalid or the user does not exist.',
      });
    }

    const _fbUser = await findFirebaseUserByEmail(_user.email);
    // TODO: update all roles as required
    const _roles = _fbUser.customClaims.roles.map((item) => {
      if (item.toString() !== 'user.basic') {
        return item;
      }
      return 'user.verified';
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
  findFirebaseUserById,
  findFirebaseUserByEmail,
  findOne,
  find,
  exists,
  search,
  create,
  updateName,
  updateDetails,
  updateRoles,
  setVerified,
  setBan,
});

module.exports = UserDataSources;
