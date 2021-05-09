const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  // GraphQLNonNull,
  // GraphQLError,
  // GraphQLList,
  GraphQLString,
  // GraphQLID,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');

const UserType = require('../user/user.type');
const { getUser } = require('../user/user.resolver');

const UserDetailType = new GraphQLObjectType({
  name: 'UserDetail',
  fields: () => ({
    name: { type: GraphQLString },
    details: {
      type: UserType,
      resolve: (parent, _args, context) => (parent.details ? getUser(null, { id: parent.details }, context) : null),
    },
  }),
});

module.exports = UserDetailType;
