const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
  GraphQLJSON,
  GraphQLJSONObject,
} = require('../scalars');

module.exports = User();

const PrivacySetting = require('./privacySetting');
const { readPrivacySetting } = require('../resolvers');

const { bucket } = require('../../config/firebase');

function User() {
  return new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      address: { type: GraphQLString },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      dob: { type: GraphQLDate },
      email: { type: GraphQLString },
      fullname: { type: GraphQLString },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      level: { type: GraphQLInt },
      sex: { type: GraphQLString },

      photo: { type: GraphQLString },
      photoURL: {
        type: GraphQLString,
        async resolve(parent, args) {
          try {
            if (parent.photo === null || parent.photo === undefined) {
              return null;
            }
            let [flag] = await (await bucket.file(parent.photo)).exists();
            if (!flag) {
              return null;
            }
            let [url] = await bucket.file(parent.photo).getSignedUrl({
              version: 'v4',
              action: 'read',
              expires: Date.now() + 86400000,
            });
            return url;
          } catch (e) {
            console.error(e);
            return null;
          }
        },
      },

      privacy: {
        type: PrivacySetting,
        async resolve(parent, args) {
          return await readPrivacySetting(parent, args);
        },
      },

      error: { type: GraphQLString },
      isError: { type: GraphQLBoolean },
      code: { type: GraphQLInt },
      docsCount: { type: GraphQLInt },

      createdAt: { type: GraphQLDateTime },
      updatedAt: { type: GraphQLDateTime },
    }),
  });
}
