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

module.exports = PrivacySetting();

function PrivacySetting() {
  return new GraphQLObjectType({
    name: 'PrivacySetting',
    fields: () => ({
      id: { type: GraphQLID },
      address: {
        type: GraphQLInt,
      },
      country: {
        type: GraphQLInt,
      },
      city: {
        type: GraphQLInt,
      },
      dob: {
        type: GraphQLInt,
      },
      email: {
        type: GraphQLInt,
      },
      job: {
        type: GraphQLInt,
      },
      sex: {
        type: GraphQLInt,
      },
      photo: {
        type: GraphQLInt,
      },
      comments: {
        type: GraphQLBoolean,
      },
      visibility: {
        type: GraphQLInt,
      },
      anonymous: {
        type: GraphQLBoolean,
      },
      anonymousName: {
        type: GraphQLString,
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
