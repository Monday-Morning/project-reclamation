const {
  GraphQLObjectType,
  // GraphQLString,
  // GraphQLSchema,
  // GraphQLID,
  // GraphQLList,
  // GraphQLBoolean,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('./scalars');

const UserType = require('./user/user.type');

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    user: {
      type: UserType,
    },
  },
});

module.exports = Subscription;
