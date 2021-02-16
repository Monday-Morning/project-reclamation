const { auth } = require('../config/firebase');
const { PrivacySettingDB, UserModel } = require('../schema/models');
const https = require('https');

module.exports.local = async (req, res, next) => {
  if (
    req === null ||
    req === undefined ||
    req.body === null ||
    req.body === undefined ||
    !Object.keys(req.body).includes('email') ||
    !Object.keys(req.body).includes('password') ||
    !Object.keys(req.body).includes('fullname') ||
    !Object.keys(req.body).includes('sex') ||
    !Object.keys(req.body).includes('dob')
  ) {
    return res.json({
      error: true,
      code: 400,
      data: 'Query Params Missing',
    });
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        error: true,
        code: 406,
        data: 'User Exists',
      });
    }

    let newUserRecord = {};
    await newUserObj(newUserRecord, req.body);
    let p1 = auth.createUser({
      displayName: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
    });
    let privacy = await PrivacySettingDB.create({});
    newUserRecord.privacy = privacy;
    let p2 = UserModel.create(newUserRecord);
    await p1;
    p2 = await (await p2).toObject();
    (await p2).authToken = await auth.createCustomToken((await p1).uid);
    delete (await p2)._id;
    delete (await p2).__v;
    delete (await p2).updatedAt;
    delete (await p2).privacy._id;
    delete (await p2).privacy.__v;
    delete (await p2).privacy.updatedAt;
    return res.json({
      error: false,
      code: 200,
      data: p2,
    });
  } catch (err) {
    return res.json({
      error: err,
      code: 500,
      data: err.message || 'Internal Server Error',
    });
  }
};

module.exports.google = async (req, res) => {
  if (
    req === null ||
    req === undefined ||
    req.headers === null ||
    req.headers === undefined ||
    req.headers.authorization === undefined ||
    req.headers.authorization === null
  ) {
    return res.json({
      error: true,
      code: 401,
      data: 'Unauthorized Request',
    });
  }
  if (
    req.body === null ||
    req.body === undefined ||
    !Object.keys(req.body).includes('email') ||
    !Object.keys(req.body).includes('token') ||
    !Object.keys(req.body).includes('fullname') ||
    !Object.keys(req.body).includes('user_id') ||
    !Object.keys(req.body).includes('scopes')
  ) {
    return res.json({
      error: true,
      code: 400,
      data: 'Query Params Missing',
    });
  }
  try {
    const SCOPES = req.body.scopes.split(' ');
    let birthDate = new Date(0),
      gender = 'other';
    if (
      SCOPES.includes('https://www.googleapis.com/auth/user.birthday.read') ||
      SCOPES.includes('https://www.googleapis.com/auth/user.gender.read')
    ) {
      var queryString = `https://people.googleapis.com/v1/people/${req.body.user_id}?personFields=`;
      if (
        SCOPES.includes('https://www.googleapis.com/auth/user.birthday.read') &&
        SCOPES.includes('https://www.googleapis.com/auth/user.gender.read')
      )
        queryString += 'birthdays,genders';
      else if (SCOPES.includes('https://www.googleapis.com/auth/user.birthday.read')) queryString += 'birthdays';
      else queryString += 'genders';
      queryString += `&access_token=${req.body.token}`;
      let gres = await new Promise((resolve, reject) => {
        https.get(queryString, (response) => {
          const { statusCode } = response;
          const contentType = response.headers['content-type'];

          let error = {};
          if (statusCode !== 200) {
            error.data = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
            error.code = statusCode;
            error.error = true;
          } else if (!/^application\/json/.test(contentType)) {
            error.data = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
            error.code = 500;
            error.error = true;
          }
          if (error.error) {
            response.resume();
            return reject(error);
          }

          response.setEncoding('utf8');
          let rawData = '';
          response.on('data', (chunk) => {
            rawData += chunk;
          });
          response.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              return resolve(parsedData);
            } catch (e) {
              return reject(e);
            }
          });
        });
      });
      if (!gres.error) {
        if (SCOPES.includes('https://www.googleapis.com/auth/user.birthday.read')) {
          let birthdays = gres.birthdays.find((x) => {
            return x.metadata.source.type === 'ACCOUNT';
          });
          console.log(birthdays.date);
          birthdays.date.year = birthdays.date.year.toString();
          if (birthdays.date.month < 10) {
            birthdays.date.month = '0' + birthdays.date.month;
          } else {
            birthdays.date.month = birthdays.date.month.toString();
          }
          if (birthdays.date.day < 10) {
            birthdays.date.day = '0' + birthdays.date.day;
          } else {
            birthdays.date.day = birthdays.date.day.toString();
          }
          birthDate = new Date(
            birthdays.date.year + '-' + birthdays.date.month + '-' + birthdays.date.day + 'T00:00:00.000Z'
          );
          console.log(birthDate.toISOString());
        }
        if (SCOPES.includes('https://www.googleapis.com/auth/user.gender.read')) {
          let genders = gres.genders.find((x) => {
            return x.metadata.source.type === 'PROFILE';
          });
          gender = genders.value;
        }
      }
    }
    let newUserRecord = {};
    await newUserObj(newUserRecord, {
      sex: gender,
      dob: birthDate.getTime(),
      fullname: req.body.fullname,
      email: req.body.email,
    });
    let privacy = await PrivacySettingDB.create({});
    newUserRecord.privacy = privacy;
    let p2 = UserModel.create(newUserRecord);
    p2 = await (await p2).toObject();
    delete (await p2)._id;
    delete (await p2).__v;
    delete (await p2).updatedAt;
    delete (await p2).privacy._id;
    delete (await p2).privacy.__v;
    delete (await p2).privacy.updatedAt;
    return res.json({
      error: false,
      code: 200,
      data: p2,
    });
  } catch (err) {
    return res.json({
      error: err,
      code: 500,
      data: err.message || 'Internal Server Error',
    });
  }
};

/*
--- Sample Response ---
{
  "resourceName": "people/10211652",
  "etag": "%some-alpha-numeric-value",
  "genders": [
	{
	  "metadata": {
		"primary": true,
		"source": {
		  "type": "PROFILE",
		  "id": "10211652"
		}
	  },
	  "value": "other",
	  "formattedValue": "Other"
	}
  ],
  "birthdays": [
	{
	  "metadata": {
		"primary": true,
		"source": {
		  "type": "PROFILE",
		  "id": "10211652"
		}
	  },
	  "date": {
		"month": 1,
		"day": 1
	  }
	},
	{
	  "metadata": {
		"source": {
		  "type": "ACCOUNT",
		  "id": "10211652"
		}
	  },
	  "date": {
		"year": 2000,
		"month": 1,
		"day": 1
	  }
	}
  ]
}
*/

module.exports.start = async (req, res) => {
  if (
    req === null ||
    req === undefined ||
    req.headers === null ||
    req.headers === undefined ||
    req.headers.authorization === undefined ||
    req.headers.authorization === null
  ) {
    return res.json({
      error: true,
      code: 401,
      data: 'Unauthorized Request',
    });
  }
  if (!Object.keys(req.headers).includes('user')) {
    return res.json({
      error: true,
      code: 400,
      data: 'Query Params Missing',
    });
  }
  // if (process.env.NODE_PROD_FLAG) {
  try {
    const user = await auth.verifyIdToken(req.headers.authorization, true);
    if (user.email !== req.headers.user) throw new Error('User mismatch');
    req.session.auth = {
      key: req.headers.authorization,
      flag: true,
    };
  } catch (e) {
    return res.json({
      error: e,
      code: 403,
      data: e.message || 'Access Forbidden',
    });
  }
  // }
  try {
    let user = await UserModel.findOne({ email: req.headers.user }).populate('privacy');
    if (!user) {
      return res.json({
        error: true,
        code: 204,
        data: 'No User Found!',
      });
    }
    user = user.toObject();
    delete user._id;
    delete user.id;
    delete user.__v;
    delete user.privacy._id;
    delete user.privacy.id;
    delete user.privacy.__v;
    return res.json({
      error: false,
      code: 200,
      data: user,
    });
  } catch (err) {
    return res.json({
      error: err,
      code: 500,
      data: err.message || 'Internal Server Error',
    });
  }
};

module.exports.end = async (req, res) => {
  if (!process.env.NODE_PROD_FLAG) {
    return res.json({
      error: false,
      code: 200,
      data: 'Auth Session Closed',
    });
  }
  try {
    let user = await auth.getUserByEmail(req.body.email);
    await req.session.destroy();
    await auth.revokeRefreshTokens(user.uid);
    return res.json({
      error: false,
      code: 200,
      data: 'Auth Session Closed',
    });
  } catch (err) {
    return res.json({
      error: err,
      code: 500,
      data: err.message || 'Internal Server Error',
    });
  }
};

async function newUserObj(userRecord, args) {
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
  if (args.email != null) {
    userRecord.email = args.email;
  }
  if (args.fullname != null) {
    userRecord.fullname = args.fullname;
  }
  if (args.job != null) {
    userRecord.job = args.job;
  }
  if (args.level != null) {
    userRecord.level = args.level;
  }
  if (args.photo != null) {
    userRecord.photo = args.photo;
  }
  if (args.sex != null) {
    userRecord.sex = args.sex;
  }
}
