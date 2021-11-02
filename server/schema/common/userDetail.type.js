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

const UserType = require('../user/user.type');
const { getUser } = require('../user/user.resolver');

const UserDetailType = new GraphQLObjectType({
  name: 'UserDetail',
  fields: () => ({
    name: { type: GraphQLString },
    details: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: (parent, _args, context, info) =>
        parent.details ? getUser(parent, { id: parent.details }, context, info) : null,
    },
  }),
});

module.exports = UserDetailType;
