const { PrivacySettingDB } = require('../mdb_models');

const readPrivacySetting = async (parents, args, context, info) => {
  try {
    let privacySetting = await PrivacySettingDB.findById(parents.privacy);
    if (!privacySetting) {
      return {
        isError: true,
        error: 'No records found!',
        code: 417,
        docsCount: 0,
      };
    }

    privacySetting.isError = false;
    privacySetting.code = 200;
    privacySetting.docsCount = 1;

    return privacySetting;
  } catch (err) {
    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: err.code || 500,
      error: err,
      message: err.message || null,
    });
  }
};

const updatePrivacySetting = async (parents, args, context, info) => {
  try {
    let privacySetting = await PrivacySettingDB.findById(parents.privacy);
    if (!privacySetting) {
      return {
        isError: true,
        error: 'No records found!',
        code: 417,
        docsCount: 0,
      };
    }

    await setValues(privacySetting, args);
    await privacySetting.save();

    privacySetting.isError = false;
    privacySetting.code = 200;
    privacySetting.docsCount = 1;

    return privacySetting;
  } catch (err) {
    return new GraphQLError('server-exception', null, null, null, null, null, {
      code: err.code || 500,
      error: err,
      message: err.message || null,
    });
  }
};

async function setValues(privacySetting, args) {
  if (args.address != null) {
    privacySetting.address = args.address;
  }
  if (args.country != null) {
    privacySetting.country = args.country;
  }
  if (args.city != null) {
    privacySetting.city = args.city;
  }
  if (args.dob != null) {
    privacySetting.dob = args.dob;
  }
  if (args.email != null) {
    privacySetting.email = args.email;
  }
  if (args.sex != null) {
    privacySetting.sex = args.sex;
  }
  if (args.photo != null) {
    privacySetting.photo = args.photo;
  }
  if (args.comments != null) {
    privacySetting.comments = args.comments;
  }
  if (args.visibility != null) {
    privacySetting.visibility = args.visibility;
  }
  if (args.anonymous != null) {
    privacySetting.anonymous = args.anonymous;
  }
  if (args.anonymousName != null) {
    privacySetting.anonymousName = args.anonymousName;
  }
}

module.exports = { readPrivacySetting, updatePrivacySetting };
