const { UserDB, PrivacySettingDB } = require('../models');
const { GraphQLError } = require('../scalars');
const mongoose = require('mongoose');

const validateExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

const updateUserById = async (parent, args, context, info) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let userRecord = await UserDB.findById(args.id);
    if (!userRecord) {
      return new GraphQLError('no-user-found', null, null, null, null, null, {
        code: 204,
        error: null,
        message: null,
      });
    }

    await setValues(userRecord, args);
    await userRecord.save();

    userRecord.docsCount = 1;
    userRecord.isError = false;
    userRecord.code = 200;

    await session.commitTransaction();
    session.endSession();

    return userRecord;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: err.code || 500,
      error: err,
      message: err.message || null,
    });
  }
};

const updateUserByEmail = async (parent, args, context, info) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let userRecord = await UserDB.findOne({ email: args.email });
    if (!userRecord) {
      return new GraphQLError('no-user-found', null, null, null, null, null, {
        code: 204,
        error: null,
        message: null,
      });
    }

    await setValues(userRecord, args);
    await userRecord.save();

    userRecord.docsCount = 1;
    userRecord.isError = false;
    userRecord.code = 200;

    await session.commitTransaction();
    session.endSession();
    return userRecord;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: err.code || 500,
      error: err,
      message: err.message || null,
    });
  }
};

const readUserById = async (parent, args, context, info) => {
  try {
    let userRecord = await UserDB.findById(args.id);
    if (!userRecord) {
      return new GraphQLError('no-user-found', null, null, null, null, null, {
        code: 204,
        error: null,
        message: null,
      });
    }

    userRecord.docsCount = 1;
    userRecord.isError = false;
    userRecord.code = 200;

    return userRecord;
  } catch (e) {
    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: e.code || 500,
      error: e,
      message: e.message || null,
    });
  }
};

const readUserByEmail = async (parent, args, context, info) => {
  try {
    let userRecord = await UserDB.findOne({ email: args.email });
    if (!userRecord) {
      return new GraphQLError('no-user-found', null, null, null, null, null, {
        code: 204,
        error: null,
        message: null,
      });
    }

    userRecord.docsCount = 1;
    userRecord.isError = false;
    userRecord.code = 200;

    return userRecord;
  } catch (e) {
    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: e.code || 500,
      error: e,
      message: e.message || null,
    });
  }
};

const createUser = async (parents, args, context, info) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let user = await UserDB.findOne({ email: args.email });
    if (user) {
      return {
        isError: true,
        code: 406,
        email: args.user,
        error: 'User already exists',
        docsCount: 1,
      };
    }

    let privacySetting = await PrivacySettingDB.create({});

    let userObject = {};
    await setValues(userObject, args);

    userObject.privacy = privacySetting;

    user = await UserDB.create(userObject);

    user = user.toObject();

    user.isError = false;
    user.code = 200;
    user.docsCount = 1;

    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (e) {
    await session.abortTransaction();
    session.endSession();

    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: e.code || 500,
      error: e,
      message: e.message || null,
    });
  }
};

const deleteUser = async (parents, args, context, info) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!args.id.match(validateExp)) {
      return new GraphQLError('server-exception', null, null, null, null, null, {
        code: 500,
        error: 'Wrong/Invalid',
        message: 'Invalid UserId' || null,
      });
    }

    let userExist = await UserDB.findById(args.id);
    if (!userExist) {
      return {
        isError: true,
        error: "User doesn't exist",
        email: 'Null',
        code: 404,
      };
    }

    await PrivacySettingDB.deleteOne({ user: args.id });
    await UserDB.deleteOne({ _id: args.id });

    let obj = {};
    obj.isError = false;
    obj.code = 200;
    obj.docsCount = await UserDB.count({});

    await session.commitTransaction();
    session.endSession();

    return obj;
  } catch (e) {
    await session.abortTransaction();
    session.endSession();

    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: e.code || 500,
      error: e,
      message: e.message || null,
    });
  }
};

async function setValues(userRecord, args) {
  if (args.address != null) {
    userRecord.address = args.address;
  }
  if (args.categories != null) {
    userRecord.categories = args.categories;
  }
  if (args.city != null) {
    userRecord.city = args.city;
  }
  if (args.country != null) {
    userRecord.country = args.country;
  }
  if (args.dob != null) {
    userRecord.dob = new Date(args.dob);
  }
  if (args.fullname != null) {
    userRecord.fullname = args.fullname;
  }
  if (args.job != null) {
    userRecord.job = args.job;
  }
  if (args.sex != null) {
    userRecord.sex = args.sex;
  }
}

module.exports = { updateUserById, updateUserByEmail, readUserByEmail, readUserById, deleteUser, createUser };
