const {
  GraphQLObjectType,
  // GraphQLString,
  // GraphQLSchema,
  GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const UserType = () =>
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },

      createdAt: { type: GraphQLDateTime },
      createdBy: { type: GraphQLID },
      updatedAt: { type: GraphQLDateTime },
      updatedBy: { type: GraphQLID },
      schemaVersion: { type: GraphQLInt },
    }),
  });

module.exports = UserType();
