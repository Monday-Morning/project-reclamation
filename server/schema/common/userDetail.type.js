const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  // GraphQLList,
  GraphQLString,
  GraphQLID,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const UserDetailType = new GraphQLObjectType({
  name: 'UserDetail',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    details: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

module.exports = UserDetailType;
